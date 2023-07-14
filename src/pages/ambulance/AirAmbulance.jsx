import {useState} from "react";
import {useLoaderData} from "react-router";
import {FormProvider, useForm} from "react-hook-form";

// * UTILS
import {getAllCities} from "../../utils/api";

// * COMPONENTS
import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";
import CitiesFinder from "../../components/forms/CitiesFinder";

const INITIAL_VALUES = {
	region: "",
	origin: "",
	destination: "",
	weight: null,
	isPackingRequired: false,
};

const AirAmbulance = () => {
	const cities = useLoaderData();

	const [isChecked, setIsChecked] = useState(false);

	const methods = useForm({
		defaultValues: {...INITIAL_VALUES},
	});

	const {
		register,
		formState: {errors},
		handleSubmit,
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
					<CitiesFinder cities={cities} />

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
