import {useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {Autocomplete} from "@react-google-maps/api";

import GoogleAutocomplete from "./forms/GoogleAutocomplete";

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

	const calculateDistance = () => {
		if (pickupAutocomplete && dropoffAutocomplete) {
			const origin = pickupAutocomplete.getPlace().geometry.location;
			const destination = dropoffAutocomplete.getPlace().geometry.location;

			const service = new window.google.maps.DistanceMatrixService();
			service.getDistanceMatrix(
				{
					origins: [origin],
					destinations: [destination],
					travelMode: "DRIVING",
				},
				(response, status) => {
					if (status === "OK") {
						const result = response.rows[0].elements[0];
						if (result.status === "OK") {
							setDistance(result.distance.text);
						}
					} else {
						console.log("Error calculating distance:", status);
					}
				}
			);
		}
	};

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
				calculateDistance();
			}
		} else {
			console.log("Dropoff Autocomplete is not loaded yet!");
		}
	};

	return (
		<>
			{distance && <p>Distance: {distance}</p>}
			<div>
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
										placeholder="Pickup Location"
										ref={field.ref}
										autoFocus
										{...field}
									/>
								</Autocomplete>
								{errors.pickup && (
									<p role="alert" className="text-[#ef4444] leading-none">
										{errors.pickup.message}
									</p>
								)}
							</>
						);
					}}
				/>
			</div>

			<div>
				<Controller
					name={"dropoff"}
					id={"dropoff"}
					control={control}
					rules={{required: "Please enter a dropoff location"}}
					render={({field}) => (
						<>
							<Autocomplete onLoad={onLoadDropoff} onPlaceChanged={onPlaceChangedForDropoff}>
								<GoogleAutocomplete
									placeholder="Dropoff Location"
									ref={field.ref}
									autoFocus
									{...field}
								/>
							</Autocomplete>
							{errors.dropoff && (
								<p role="alert" className="text-[#ef4444] leading-none">
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
