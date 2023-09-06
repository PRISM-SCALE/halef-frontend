import {useCallback, useEffect, useState} from "react";
import {Controller, useFormContext, useWatch} from "react-hook-form";

import GoogleInput from "./GoogleInput";

// * If your value is DOMESTIC only get postal_code based on INDIA and make other region pincode as not valid for domestic purpose
// * The Pincode should match based on region, domestic or international, When region is not set, and pincode(560016 validates as FROM INDIA) is entered setValue("domestic")
// * Assuming we type 560016(Bengaluru, India) & 57000(Malaysia) this case would be invalid the origin and destination country must match when region is DOMESTIC
// * Show Locality Validation for pincodes

const GooglePincodeForm = () => {
	const {
		control,
		formState: {errors},
		setError,
		watch,
	} = useFormContext();

	const values = watch();

	const originPincode = useWatch({name: "pickup", control});
	const destinationPincode = useWatch({name: "dropoff", control});

	const [validOriginPincodeCity, setValidOriginPincodeCity] = useState();
	const [validDestinationPincodeCity, setValidDestinationPincodeCity] = useState();

	// * ---------------------------------------------------------------------------------
	// * ---------------------------------------------------------------------------------

	const geocodePincode = useCallback(
		(pincode, callback) => {
			var geocoder = new window.google.maps.Geocoder();

			if (originPincode === destinationPincode) {
				setError("pickup", {message: "Origin pincode cannot be the same as Destination pincode"});
				setError("dropoff", {message: "Destination pincode cannot be the same as Origin pincode"});
			} else {
				geocoder.geocode(
					{address: pincode, componentRestrictions: {country: "IN", postalCode: pincode}},

					function (results, status) {
						if (status === window.google.maps.GeocoderStatus.OK) {
							if (results.length > 0) {
								// var location = results[0].geometry.location;
								var location = results[0];

								setError("pickup", {message: ""});
								setError("dropoff", {message: ""});

								// * SEND WHATEVER
								callback({location});
							} else {
								if (!originPincode) {
									setValidOriginPincodeCity();
								}

								if (!destinationPincode) {
									setValidDestinationPincodeCity();
								}

								setError("pickup", {message: `No location is found for the pincode: ${pincode}`});
								setError("dropoff", {message: `No location is found for the pincode: ${pincode}`});
							}
						} else {
							if (!originPincode) {
								setValidOriginPincodeCity();
							}

							if (!destinationPincode) {
								setValidDestinationPincodeCity();
							}
							setError("pickup", {message: `Request failed for pincode: ${pincode}`});
							setError("dropoff", {message: `Request failed for pincode: ${pincode}`});
						}
					}
				);
			}
		},
		[destinationPincode, originPincode, setError]
	);

	// * ---------------------------------------------------------------------------------
	// * GETTING LOCATION DETAILS BASED ON PIN CODES
	useEffect(() => {
		if (originPincode) {
			geocodePincode(originPincode, (originLocation) => {
				const validCity = originLocation.location.address_components;

				if (validCity?.length !== 0) {
					setValidOriginPincodeCity(validCity[1].long_name);
				} else {
					setValidOriginPincodeCity(null);
					setError("pickup", {message: ""});
					setError("dropoff", {message: ""});
				}
			});
		} else {
			setValidOriginPincodeCity();
		}
	}, [geocodePincode, originPincode, setError]);

	useEffect(() => {
		if (destinationPincode) {
			geocodePincode(destinationPincode, function (destinationLocation) {
				const validCity = destinationLocation.location.address_components;

				if (validCity?.length !== 0) {
					setValidDestinationPincodeCity(validCity[1].long_name);
				} else {
					setValidDestinationPincodeCity(null);
				}
			});
		} else {
			setValidDestinationPincodeCity();
		}
	}, [destinationPincode, geocodePincode, setError]);

	const fixingExponentInInputTypeNumber = (e) =>
		["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

	return (
		<>
			<fieldset>
				<div className="flex items-center justify-between">
					<label htmlFor="pickup" className="text-[#f8bf02]">
						Origin Pincode
					</label>
					{validOriginPincodeCity && <p className="text-green-500">{validOriginPincodeCity}</p>}
				</div>
				<Controller
					name={"pickup"}
					id={"pickup"}
					control={control}
					rules={{
						required: "Please enter a pickup pincode",

						maxLength: {
							value: 6,
							message: "Pincode must be of 6 digit value",
						},
					}}
					render={({field}) => {
						const {value} = field;
						return (
							<>
								<GoogleInput
									type={watch("region") !== "domestic" ? "text" : "number"}
									// onChange={handleOriginPincodeChange}
									onKeyDown={fixingExponentInInputTypeNumber}
									onCopy={fixingExponentInInputTypeNumber}
									onPaste={fixingExponentInInputTypeNumber}
									value={value}
									placeholder="Origin Pincode"
									disabled={!watch("region") || values.region === "international" || false}
									ref={field.ref}
									{...field}
								/>
								{errors.pickup && (
									<p role="alert" className="text-[#ef4444] leading-none mt-1">
										{errors.pickup.message}
									</p>
								)}
							</>
						);
					}}
				/>
			</fieldset>

			<fieldset>
				<div className="flex items-center justify-between">
					<label htmlFor="dropoff" className="text-[#f8bf02]">
						Destination Pincode
					</label>
					{validDestinationPincodeCity && (
						<p className="text-green-500">{validDestinationPincodeCity}</p>
					)}
				</div>
				<Controller
					name={"dropoff"}
					id={"dropoff"}
					control={control}
					rules={{
						required: "Please enter a dropoff Pincode",

						maxLength: {
							value: 6,
							message: "Pincode must be of 6 digit value",
						},
					}}
					render={({field}) => {
						const {value} = field;
						return (
							<>
								<GoogleInput
									type={watch("region") !== "domestic" ? "text" : "number"}
									// onChange={handleDestinationPincodeChange}
									value={value}
									onKeyDown={fixingExponentInInputTypeNumber}
									onCopy={fixingExponentInInputTypeNumber}
									onPaste={fixingExponentInInputTypeNumber}
									placeholder="Destination Pincode"
									disabled={!watch("region") || values.region === "international" || false}
									ref={field.ref}
									{...field}
								/>
								{errors.dropoff && (
									<p role="alert" className="text-[#ef4444] leading-none mt-1">
										{errors.dropoff.message}
									</p>
								)}
							</>
						);
					}}
				/>
			</fieldset>
		</>
	);
};

export default GooglePincodeForm;
