/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {Autocomplete} from "@react-google-maps/api";
import PropTypes from "prop-types";

import GoogleInput from "./GoogleInput";
import {calculateDistance} from "../../utils/distanceCalculation";
import {useLocation} from "react-router-dom";

const GoogleDistanceFinder = ({originOptions, destinationOptions, setDistance}) => {
	const location = useLocation();

	const checkPathIsAirAmbulance = location.pathname === "/airambulance";

	const pickupAutocomplete = useRef();
	const dropoffAutocomplete = useRef();

	// console.log(distance);

	const {
		control,
		formState: {errors},
		setValue,
	} = useFormContext();

	useEffect(() => {
		// Calculate distance whenever the pickup or drop-off locations change
		if (pickupAutocomplete.current && dropoffAutocomplete.current) {
			calculateDistance(pickupAutocomplete.current, dropoffAutocomplete.current, setDistance);
		}
	}, [pickupAutocomplete.current, dropoffAutocomplete.current]);

	// useEffect(() => {
	// 	if (isSubmitSuccessful) {
	// 		setDistance(null);
	// 	}
	// }, [isSubmitSuccessful]);

	const onLoadPickup = (autocomplete) => {
		// console.log("pickup autocomplete: ", autocomplete);
		pickupAutocomplete.current = autocomplete;
	};

	const onLoadDropoff = (autocomplete) => {
		// console.log("dropoff autocomplete: ", autocomplete);
		dropoffAutocomplete.current = autocomplete;
		// calculateDistance();
	};

	const onPlaceChangedForPickup = () => {
		if (pickupAutocomplete.current !== null) {
			const place = pickupAutocomplete.current.getPlace();
			console.log(place);
			if (place && checkPathIsAirAmbulance) {
				setValue("pickup", place?.address_components[0]?.long_name);
				return;
			}

			if (place) {
				setValue("pickup", place.formatted_address);

				calculateDistance(pickupAutocomplete.current, dropoffAutocomplete.current, setDistance);
			}
		} else {
			console.log("Pickup Autocomplete is not loaded yet!");
		}
	};

	const onPlaceChangedForDropoff = () => {
		if (dropoffAutocomplete.current !== null) {
			const place = dropoffAutocomplete.current.getPlace();
			console.log(place);

			if (place && checkPathIsAirAmbulance) {
				setValue("dropoff", place.vicinity);
				console.log("in air_ambulance");
				return;
			}

			if (place) {
				setValue("dropoff", place.formatted_address);
				console.log("in other pages");

				// * Calculate Distance
				calculateDistance(pickupAutocomplete.current, dropoffAutocomplete.current, setDistance);
			}
		} else {
			console.log("Dropoff Autocomplete is not loaded yet!");
		}
	};

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
									onPlaceChanged={onPlaceChangedForPickup}
									options={originOptions}
								>
									<GoogleInput placeholder="Pickup Address" ref={field.ref} {...field} />
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
								onPlaceChanged={onPlaceChangedForDropoff}
								options={destinationOptions}
							>
								<GoogleInput placeholder="Destination Address" ref={field.ref} {...field} />
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
};

export default GoogleDistanceFinder;
