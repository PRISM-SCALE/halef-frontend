import {useEffect} from "react";
import {Controller, useFormContext, useWatch} from "react-hook-form";

import GoogleInput from "./forms/GoogleInput";

// * If your value is DOMESTIC only get postal_code based on INDIA and make other region pincode as not valid for domestic purpose
// * The Pincode should match based on region, domestic or international, When region is not set, and pincode(560016) is entered setValue("domestic")
// * Assuming we type 560016(Bengaluru, India) & 57000(Malaysia) this case would be invalid the origin and destination country must match

const GooglePincodeForm = () => {
	const {
		control,
		formState: {errors},
		watch,
	} = useFormContext();
	const originPincode = useWatch({name: "pickup", control});
	const destinationPincode = useWatch({name: "dropoff", control});

	// * ---------------------------------------------------------------------------------
	// * GETTING LOCATION DETAILS BASED ON PIN CODES
	useEffect(() => {
		const handlePincodeChange = () => {
			if (originPincode && destinationPincode) {
				geocodePincode(originPincode, function (originLocation) {
					console.log("Origin Location Details:");
					console.log("Latitude:", originLocation.lat);
					console.log("Longitude:", originLocation.lng);

					geocodePincode(destinationPincode, function (destinationLocation) {
						console.log("Destination Location Details:");
						console.log("Latitude:", destinationLocation.lat);
						console.log("Longitude:", destinationLocation.lng);
					});
				});
			}
		};

		if (originPincode && destinationPincode) {
			handlePincodeChange();
		}
	}, [originPincode, destinationPincode]);

	function geocodePincode(pincode, callback) {
		var geocoder = new window.google.maps.Geocoder();

		console.log(geocoder);

		geocoder.geocode({address: pincode}, function (results, status) {
			console.log(results);
			if (status === window.google.maps.GeocoderStatus.OK) {
				if (results.length > 0) {
					var location = results[0].geometry.location;
					callback({lat: location.lat(), lng: location.lng()});
				} else {
					console.log("No results found for the pincode:", pincode);
				}
			} else {
				console.log("Geocode request failed for the pincode:", pincode);
			}
		});
	}

	return (
		<>
			<fieldset>
				<label htmlFor="pickup" className="text-[#f8bf02]">
					Origin Pincode
				</label>
				<Controller
					name={"pickup"}
					id={"pickup"}
					control={control}
					rules={{required: "Please enter a pickup pincode"}}
					render={({field}) => {
						return (
							<>
								<GoogleInput
									type={watch("region") !== "domestic" ? "text" : "number"}
									placeholder="Origin Pincode"
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
				<label htmlFor="dropoff" className="text-[#f8bf02]">
					Destination Pincode
				</label>
				<Controller
					name={"dropoff"}
					id={"dropoff"}
					control={control}
					rules={{required: "Please enter a dropoff Pincode"}}
					render={({field}) => (
						<>
							<GoogleInput
								type={watch("region") !== "domestic" ? "text" : "number"}
								placeholder="Destination Pincode"
								ref={field.ref}
								{...field}
							/>
							{errors.dropoff && (
								<p role="alert" className="text-[#ef4444] leading-none mt-1">
									{errors.dropoff.message}
								</p>
							)}
						</>
					)}
				/>
			</fieldset>
		</>
	);
};

export default GooglePincodeForm;
