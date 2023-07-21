import {useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {Autocomplete} from "@react-google-maps/api";

import GoogleInput from "./GoogleInput";
import {calculateDistance} from "../../utils/distanceCalculation";
import {useLocation} from "react-router-dom";

const GoogleDistanceFinder = () => {
	const location = useLocation();

	const checkPathIsAirAmbulance = location.pathname === "/airambulance";
	const checkPath = location.pathname === "/relocation" && location.pathname === "/trucking";

	const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
	const [dropoffAutocomplete, setDropoffAutocomplete] = useState(null);
	const [distance, setDistance] = useState(null);
	// console.log(distance);

	const {
		control,
		formState: {errors},
		setValue,
	} = useFormContext();

	// useEffect(() => {
	// 	if (isSubmitSuccessful) {
	// 		setDistance(null);
	// 	}
	// }, [isSubmitSuccessful]);

	const onLoadPickup = (autocomplete) => {
		// console.log("pickup autocomplete: ", autocomplete);
		setPickupAutocomplete(autocomplete);
	};

	const onLoadDropoff = (autocomplete) => {
		// console.log("dropoff autocomplete: ", autocomplete);
		setDropoffAutocomplete(autocomplete);
		// calculateDistance();
	};

	const onPlaceChangedForPickup = () => {
		if (pickupAutocomplete !== null) {
			const place = pickupAutocomplete.getPlace();
			console.log(place);
			if (place && checkPathIsAirAmbulance) {
				setValue("pickup", place.vicinity);
			}

			if (place && checkPath) {
				setValue("pickup", place.formatted_address);
			}
		} else {
			console.log("Pickup Autocomplete is not loaded yet!");
		}
	};

	const onPlaceChangedForDropoff = () => {
		if (dropoffAutocomplete !== null) {
			const place = dropoffAutocomplete.getPlace();
			console.log(place);

			if (place && checkPathIsAirAmbulance) {
				setValue("dropoff", place.vicinity);
				console.log("in air_ambulance");
			}

			if (place && checkPath) {
				setValue("dropoff", place.formatted_address);
				console.log("in other pages");

				// * Calculate Distance
				calculateDistance(pickupAutocomplete, dropoffAutocomplete, setDistance);
			}
		} else {
			console.log("Dropoff Autocomplete is not loaded yet!");
		}
	};

	if (distance !== null) {
		setValue("distance", Number(distance.replace(" km", "").replace(",", "")));
	}
	console.log(distance);

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
									// options={{types: ["geocode"]}}
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
							<Autocomplete onLoad={onLoadDropoff} onPlaceChanged={onPlaceChangedForDropoff}>
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

export default GoogleDistanceFinder;
