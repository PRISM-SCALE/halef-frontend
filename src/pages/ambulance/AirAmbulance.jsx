import {useState} from "react";
import {Controller, FormProvider, useForm} from "react-hook-form";
// import {useLoaderData} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// * UTILS
import {getAllCities} from "../../utils/api";

// * COMPONENTS
import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";

const INITIAL_VALUES = {
	region: "",
	origin: "",
	destination: "",
	weight: null,
	isPackingRequired: false,
};

const options = [
	{name: "United States"},
	{name: "Canada"},
	{name: "Mexico"},
	{name: "Brazil"},
	{name: "Argentina"},
	{name: "Chile"},
];

const AirAmbulance = () => {
	// const data = useLoaderData();

	// console.log(data);

	const [isChecked, setIsChecked] = useState(false);

	const methods = useForm({
		defaultValues: {...INITIAL_VALUES},
	});

	const {
		register,
		formState: {errors},
		handleSubmit,
		// watch,
		// setError,
		control,
		// setValue,

		// formState,
		// reset,
	} = methods;

	// useEffect(() => {
	// 	const getData = setTimeout(() => {
	// 		getAllCities();
	// 	}, 2000);

	// 	return () => clearTimeout(getData);
	// }, []);

	// if (watch("origin") === watch("destination")) {
	// 	setError("origin", `${watch("origin")} cannot be the same as ${watch("destination")}`);
	// 	setError("destination", `${watch("destination")} cannot be the same as ${watch("origin")}`);
	// }

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS
	const onSubmit = (data) => {
		console.log(data);
	};

	const header_name = (
		<>
			Air <strong className="text-[#DD3333]">Ambulance</strong>
		</>
	);
	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />
			<FormProvider {...methods}>
				<FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label htmlFor="region" className="text-[#f8bf02]">
							Select Your Region
						</label>
						<select
							name="region"
							className="input-fields appearance-none focus:outline-[#dd3333]"
							{...register("region", {required: "Please select your region"})}
						>
							<option value="">Choose your region</option>
							<option value="domestic">Domestic</option>
							<option value="international">International</option>
						</select>
						{errors.region && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.region?.message}
							</p>
						)}
					</div>

					{/* <GoogleDistanceFinder /> */}
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
												options={options}
												autoHighlight
												getOptionLabel={(option) => option.name}
												renderInput={(params) => (
													<>
														<TextField
															className="input-fields focus:outline-[#dd3333] appearance-none"
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
												options={options}
												autoHighlight
												getOptionLabel={(option) => option.name}
												renderInput={(params) => (
													<>
														<TextField
															className="input-fields focus:outline-[#dd3333] appearance-none"
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

					<div className="w-full">
						<label htmlFor="weight" className="text-[#f8bf02]">
							Weight (cm)
						</label>
						<input
							name="weight"
							type="number"
							className="input-fields focus:outline-[#dd3333] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							placeholder="Enter your goods weight"
							{...register("weight", {required: "Please enter the exact weight of your goods"})}
							aria-invalid={errors.weight ? "true" : "false"}
						/>
						{errors.weight && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.weight?.message}
							</p>
						)}
					</div>

					<div className="flex items-center gap-2">
						<label htmlFor="isPackingRequired">Do you need packing?</label>
						<input
							type="checkbox"
							name="isPackingRequired"
							id="relocation-isPackingRequired"
							{...register("isPackingRequired")}
							checked={isChecked}
							onChange={() => setIsChecked(!isChecked)}
						/>
					</div>

					<Button buttonText="coming soon" disabled />
				</FormWrapper>
			</FormProvider>
		</ServiceWrapper>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export async function airAmbulanceLoader() {
	const cities = await getAllCities();

	return cities;
}

export default AirAmbulance;
