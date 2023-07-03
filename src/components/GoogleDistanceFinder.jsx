import {useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {Autocomplete} from "@react-google-maps/api";

import GoogleAutocomplete from "./forms/GoogleAutocomplete";

const GoogleDistanceFinder = () => {
	const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
	const [dropoffAutocomplete, setDropoffAutocomplete] = useState(null);

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
			}
		} else {
			console.log("Dropoff Autocomplete is not loaded yet!");
		}
	};

	return (
		<>
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
