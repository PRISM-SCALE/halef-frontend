/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {Autocomplete} from "@react-google-maps/api";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

import GoogleInput from "./GoogleInput";
import {calculateDistance} from "../../utils/distanceCalculation";
import {useLocation} from "react-router-dom";

const GoogleDistanceFinder = ({originOptions, destinationOptions, setDistance, disabled}) => {
	const location = useLocation();

	const checkPathIsAirAmbulance = location.pathname.includes("/airambulance");

	const pickupAutocomplete = useRef();
	const dropoffAutocomplete = useRef();

	const {
		control,
		formState: {errors},
		setValue,
		setError,
	} = useFormContext();

	useEffect(() => {
		// Calculate distance whenever the pickup or drop-off locations change
		if (pickupAutocomplete.current && dropoffAutocomplete.current) {
			calculateDistance(pickupAutocomplete.current, dropoffAutocomplete.current, setDistance);
		}
	}, [pickupAutocomplete.current, dropoffAutocomplete.current]);

	const onLoadPickup = (autocomplete) => {
		pickupAutocomplete.current = autocomplete;
	};

	const onLoadDropoff = (autocomplete) => {
		dropoffAutocomplete.current = autocomplete;
		// calculateDistance();
	};

	const onPlaceChangedForPickup = () => {
		if (pickupAutocomplete.current !== null) {
			const place = pickupAutocomplete.current.getPlace();
			if (place && checkPathIsAirAmbulance) {
				setValue("pickup", place?.address_components[0]?.long_name);
				return;
			}

			if (place) {
				setValue("pickup", place.formatted_address);
				setValue("originLocation", place);

				calculateDistance(pickupAutocomplete.current, dropoffAutocomplete.current, setDistance);
			}
		} else {
			setError("pickup", "Pickup Autocomplete is not loaded yet!");
		}
	};

	const onPlaceChangedForDropoff = () => {
		if (dropoffAutocomplete.current !== null) {
			const place = dropoffAutocomplete.current.getPlace();

			if (place && checkPathIsAirAmbulance) {
				setValue("dropoff", place.address_components[0]?.long_name);
				return;
			}

			if (place) {
				setValue("dropoff", place.formatted_address);
				setValue("destinationLocation", place);

				// * Calculate Distance
				calculateDistance(pickupAutocomplete.current, dropoffAutocomplete.current, setDistance);
			}
		} else {
			setError("dropoff", "Dropoff Autocomplete is not loaded yet!");
		}
	};

	// Create a debounced version of the onPlaceChangedForPickup function
	const debouncedOnPlaceChangedForPickup = useRef(
		debounce(() => {
			onPlaceChangedForPickup();
		}, 500) // Adjust the debounce delay as needed (e.g., 500 milliseconds)
	);

	// Create a debounced version of the onPlaceChangedForDropoff function
	const debouncedOnPlaceChangedForDropoff = useRef(
		debounce(() => {
			onPlaceChangedForDropoff();
		}, 500) // Adjust the debounce delay as needed (e.g., 500 milliseconds)
	);

	return (
		<>
			<div>
				<label htmlFor="pickup" className="text-[#f8bf02]">
					Pickup Location
				</label>
				<Controller
					name={"pickup"}
					id={"pickup"}
					control={control}
					rules={{required: "Please enter a pickup location"}}
					render={({field}) => {
						return (
							<>
								<Autocomplete
									onLoad={onLoadPickup}
									onPlaceChanged={() => debouncedOnPlaceChangedForPickup.current()}
									options={originOptions}
								>
									<GoogleInput
										placeholder="Pickup Address"
										ref={field.ref}
										{...field}
										disabled={disabled}
									/>
								</Autocomplete>
								{errors.pickup && (
									<p role="alert" className="text-[#ef4444] leading-none mt-1">
										{errors.pickup.message}
									</p>
								)}
							</>
						);
					}}
				/>
			</div>

			<div>
				<label htmlFor="dropoff" className="text-[#f8bf02]">
					Dropoff Location
				</label>
				<Controller
					name={"dropoff"}
					id={"dropoff"}
					control={control}
					rules={{required: "Please enter a dropoff location"}}
					render={({field}) => (
						<>
							<Autocomplete
								onLoad={onLoadDropoff}
								onPlaceChanged={() => debouncedOnPlaceChangedForDropoff.current()}
								options={destinationOptions}
							>
								<GoogleInput
									placeholder="Destination Address"
									ref={field.ref}
									{...field}
									disabled={disabled}
								/>
							</Autocomplete>
							{errors.dropoff && (
								<p role="alert" className="text-[#ef4444] leading-none mt-1">
									{errors.dropoff.message}
								</p>
							)}
						</>
					)}
				/>
			</div>
		</>
	);
};

GoogleDistanceFinder.propTypes = {
	originOptions: PropTypes.object,
	destinationOptions: PropTypes.object,
	setDistance: PropTypes.func,
	disabled: PropTypes.bool,
};

export default GoogleDistanceFinder;
