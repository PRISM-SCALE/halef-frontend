import {useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {Autocomplete} from "@react-google-maps/api";

import GoogleAutocomplete from "./forms/GoogleAutocomplete";
import {calculateDistance} from "../utils/distanceCalculation";

const GoogleDistanceFinder = () => {
	const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
	const [dropoffAutocomplete, setDropoffAutocomplete] = useState(null);
	const [distance, setDistance] = useState(null);
	console.log(distance);

	const {
		control,
		formState: {errors},
		setValue,
	} = useFormContext();

	const onLoadPickup = (autocomplete) => {
		console.log("pickup autocomplete: ", autocomplete);
		setPickupAutocomplete(autocomplete);
	};

	const onLoadDropoff = (autocomplete) => {
		console.log("dropoff autocomplete: ", autocomplete);
		setDropoffAutocomplete(autocomplete);
		// calculateDistance();
	};

	const onPlaceChangedForPickup = () => {
		if (pickupAutocomplete !== null) {
			const place = pickupAutocomplete.getPlace();
			console.log(place);
			if (place) {
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
			if (place) {
				setValue("dropoff", place.formatted_address);

				// * Calculate Distance
				calculateDistance(pickupAutocomplete, dropoffAutocomplete, setDistance);
			}
		} else {
			console.log("Dropoff Autocomplete is not loaded yet!");
		}
	};

	return (
		<>
			{distance && <p>Distance: {distance}</p>}
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
								<Autocomplete onLoad={onLoadPickup} onPlaceChanged={onPlaceChangedForPickup}>
									<GoogleAutocomplete
										placeholder="Pickup Address"
										ref={field.ref}
										autoFocus
										{...field}
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
							<Autocomplete onLoad={onLoadDropoff} onPlaceChanged={onPlaceChangedForDropoff}>
								<GoogleAutocomplete placeholder="Destination Address" ref={field.ref} {...field} />
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
