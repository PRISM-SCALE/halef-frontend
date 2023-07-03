import {useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {Autocomplete} from "@react-google-maps/api";

import GoogleAutocomplete from "./forms/GoogleAutocomplete";

const GoogleDistanceFinder = () => {
	const [autocomplete, setAutocomplete] = useState(null);

	const {
		control,
		formState: {errors},
		// setValue,
	} = useFormContext();

	const onLoad = (autocomplete) => {
		console.log("autocomplete: ", autocomplete);
		setAutocomplete(autocomplete);
	};

	const onPlaceChangedForPickup = () => {
		if (autocomplete !== null) {
			console.log(autocomplete.getPlace());
			// setValue("pickup", autocomplete.getPlace());
		} else {
			console.log("Autocomplete is not loaded yet!");
		}
	};

	const onPlaceChangedForDropoff = () => {
		if (autocomplete !== null) {
			console.log(autocomplete.getPlace());
			// setValue("dropoff", autocomplete.getPlace());
		} else {
			console.log("Autocomplete is not loaded yet!");
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
								<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChangedForPickup}>
									<GoogleAutocomplete
										placeholder="Pickup Location"
										onLoad={onLoad}
										onPalceChanged={onPlaceChangedForPickup}
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
							<GoogleAutocomplete
								placeholder="Dropoff Location"
								ref={field.ref}
								onLoad={onLoad}
								onPalceChanged={onPlaceChangedForDropoff}
								autoFocus
								{...field}
							/>
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
