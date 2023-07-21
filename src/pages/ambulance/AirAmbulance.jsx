import {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

// * UTILS
// import {getAllCities} from "../../utils/api";

// * COMPONENTS
import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";
import GoogleDistanceFinder from "../../components/forms/GoogleDistanceFinder";
import {airAmbulanceCalculationService} from "../../utils/api";

const INITIAL_VALUES = {
	region: "",
	// origin: "",
	// destination: "",
	pickup: "",
	dropoff: "",
	weight: null,
	isPackingRequired: false,
};

const AirAmbulance = () => {
	const [isChecked, setIsChecked] = useState(false);

	const methods = useForm({
		defaultValues: {...INITIAL_VALUES},
	});

	const {
		register,
		formState: {errors},
		handleSubmit,
		watch,
		// setError,
		// getValues,
	} = methods;

	// useEffect(() => {
	// 	if (getValues("pickup") === getValues("dropoff")) {
	// 		setError("pickup", `${getValues("pickup")} cannot be the same as ${getValues("dropoff")}`);
	// 		setError("dropoff", `${getValues("dropoff")} cannot be the same as ${getValues("pickup")}`);
	// 	}
	// }, [getValues, setError]);

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS
	const onSubmit = (data) => {
		airAmbulanceCalculationService(data);
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

					<GoogleDistanceFinder
					// originOptions={{types: ["airport"]}}
					// destinationOptions={{types: ["airport"]}}
					/>
					{/* <CitiesFinder cities={cities} /> */}

					<div className="w-full">
						<label htmlFor="weight" className="text-[#f8bf02]">
							Weight (kg)
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

					{/* cost 5000/- */}
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

					<Button
						buttonText={
							watch("region") === "international"
								? "coming soon"
								: watch("region") === "domestic"
								? "calculate"
								: "calculate"
						}
						disabled={watch("region") === "international"}
						// onClick={handleClickOpen}
					/>
				</FormWrapper>
			</FormProvider>
		</ServiceWrapper>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
// export async function airAmbulanceLoader() {
// 	const cities = await getAllCities();

// 	return cities;
// }

export default AirAmbulance;
