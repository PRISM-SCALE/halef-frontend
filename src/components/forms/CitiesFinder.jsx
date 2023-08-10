import {useEffect, useMemo, useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import PropTypes, {object} from "prop-types";

import {Autocomplete, TextField} from "@mui/material";
import {debounce} from "@mui/material/utils";

// const options = ["Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai", "Hyderabad", "Ahmedabad"];

const CitiesFinder = ({cities}) => {
	// * ------------------------------------------------------------------------
	// * STATES FOR ORIGIN CITIES
	const [originValue, setOriginValue] = useState(null);
	const [originOptions, setOriginOptions] = useState([]);
	const [originInputValue, setOriginInputValue] = useState("");

	// * ------------------------------------------------------------------------
	// * STATES FOR DESTINATION CITIES
	const [destinationValue, setDestinationValue] = useState(null);
	const [destinationOptions, setDestinationOptions] = useState([]);
	const [destinationInputValue, setDestinationInputValue] = useState("");

	// * REACT HOOK FORM CONTEXT METHOD
	const {
		control,
		formState: {errors},
		setValue,
	} = useFormContext();

	const debounceCities = useMemo(
		() =>
			debounce((request, callback) => {
				// Filter the cities based on the input value
				const filteredCities = cities.filter(
					(city) => city.city.toLowerCase().indexOf(request.input.toLowerCase()) !== -1
				);

				setTimeout(() => {
					callback(filteredCities);
				}, 2000);
			}, 2000),
		[cities]
	);

	// * ------------------------------------------------------------------------
	// * ------------------------------------------------------------------------
	// * FETCHING ORIGIN CITIES OPTIONS
	const fetchOriginCities = debounceCities;
	useEffect(() => {
		let active = true;

		if (originInputValue !== "") {
			setValue("origin", originInputValue);
		}

		if (originInputValue === "") {
			setOriginOptions(originValue ? [originValue] : []);
			return undefined;
		}

		fetchOriginCities({input: originInputValue}, (results) => {
			if (active) {
				let newOptions = [];

				if (originValue) {
					newOptions = [originValue];
				}

				if (results) {
					newOptions = [...newOptions, ...results];
				}

				setOriginOptions(newOptions);
			}
		});

		return () => {
			active = false;
		};
	}, [originValue, originInputValue, fetchOriginCities, setValue]);

	// * ------------------------------------------------------------------------
	// * FETCHING DESTINATION CITIES OPTIONS
	const fetchDestinationCities = debounceCities;
	useEffect(() => {
		let active = true;

		if (destinationInputValue !== "") {
			setValue("destination", destinationInputValue);
		}

		if (destinationInputValue === "") {
			setDestinationOptions(destinationValue ? [destinationValue] : []);
			return undefined;
		}

		fetchDestinationCities({input: destinationInputValue}, (results) => {
			if (active) {
				let newOptions = [];

				if (destinationValue) {
					newOptions = [destinationValue];
				}

				if (results) {
					newOptions = [...newOptions, ...results];
				}

				setDestinationOptions(newOptions);
			}
		});

		return () => {
			active = false;
		};
	}, [destinationValue, destinationInputValue, fetchDestinationCities, setValue]);

	// * ------------------------------------------------------------------------
	// * ------------------------------------------------------------------------

	return (
		<div className="flex items-center justify-between gap-4 flex-col md:flex-row">
			<fieldset className="w-full">
				<label htmlFor="origin" className="text-[#f8bf02]">
					Origin city
				</label>
				<Controller
					name={"origin"}
					id={"origin"}
					control={control}
					rules={{required: "Please enter your origin city"}}
					render={() => {
						return (
							<>
								<Autocomplete
									getOptionLabel={(option) => (typeof option === "string" ? option : option.city)}
									filterOptions={(x) => x}
									options={originOptions.map((option) => ({
										...option,
										key: option._id, // Add a unique key based on the 'city' property
									}))}
									autoComplete
									includeInputInList
									filterSelectedOptions
									value={originValue}
									noOptionsText="Search for cities"
									isOptionEqualToValue={(option, value) => option._id === value._id}
									onChange={(event, newValue) => {
										setOriginOptions(newValue ? [newValue, ...originOptions] : originOptions);
										setOriginValue(newValue);
									}}
									onInputChange={(event, newDestinationValue) => {
										setOriginInputValue(newDestinationValue);
									}}
									renderInput={(params) => (
										<>
											<TextField
												className="input-fields  appearance-none rounded-none"
												{...params}
												placeholder="Choose a country"
												inputProps={{
													...params.inputProps,
													autoComplete: "new-password", // disable autocomplete and autofill
												}}
											/>
											{errors.origin && (
												<p role="alert" className="text-[#ef4444] leading-none mt-1">
													{errors.origin?.message}
												</p>
											)}
										</>
									)}
								/>
							</>
						);
					}}
				/>
			</fieldset>

			<fieldset className="w-full">
				<label htmlFor="destination" className="text-[#f8bf02]">
					Destination city
				</label>
				<Controller
					name={"destination"}
					id={"destination"}
					control={control}
					rules={{required: "Please enter your destination city"}}
					render={() => {
						return (
							<>
								<Autocomplete
									getOptionLabel={(option) => (typeof option === "string" ? option : option.city)}
									filterOptions={(x) => x}
									options={destinationOptions.map((option) => ({
										...option,
										key: option._id, // Add a unique key based on the 'city' property
									}))}
									autoComplete
									includeInputInList
									filterSelectedOptions
									value={destinationValue}
									noOptionsText="Search for cities"
									isOptionEqualToValue={(option, value) => option._id === value._id}
									onChange={(event, newValue) => {
										setDestinationOptions(
											newValue ? [newValue, ...destinationOptions] : destinationOptions
										);
										setDestinationValue(newValue);
									}}
									onInputChange={(event, newOriginValue) => {
										setDestinationInputValue(newOriginValue);
									}}
									renderInput={(params) => (
										<>
											<TextField
												className="input-fields  appearance-none"
												{...params}
												placeholder="Choose a country"
												inputProps={{
													...params.inputProps,
													autoComplete: "new-password", // disable autocomplete and autofill
												}}
											/>
											{errors.origin && (
												<p role="alert" className="text-[#ef4444] leading-none mt-1">
													{errors.origin?.message}
												</p>
											)}
										</>
									)}
								/>
							</>
						);
					}}
				/>
			</fieldset>
		</div>
	);
};

CitiesFinder.propTypes = {
	cities: PropTypes.arrayOf(object).isRequired,
};

export default CitiesFinder;
