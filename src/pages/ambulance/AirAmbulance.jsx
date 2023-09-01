import {useCallback, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

// * HOOKS
import useToggle from "../../hooks/useToggle";
import useLocalStorage from "../../hooks/useLocalStorage";

// * COMPONENTS
import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";
import GoogleDistanceFinder from "../../components/forms/GoogleDistanceFinder";
import {airAmbulanceCalculationService} from "../../utils/api";
import Modal from "../../components/Modal";
import {useLocation} from "react-router-dom";

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
	const [airAmbulanceData, setAirAmbulanceData] = useState(null);

	const {toggle: open, onOpen, onClose} = useToggle();
	// eslint-disable-next-line no-unused-vars
	const [storedValues, setValueToLocalStorage] = useLocalStorage("userData");
	const location = useLocation();
	const serviceId = location.search.replace(/^\?id=/, "");

	const methods = useForm({
		defaultValues: {...INITIAL_VALUES},
	});

	const {
		register,
		formState: {errors, isValid},
		handleSubmit,
		watch,
		// setError,
		// getValues,
	} = methods;

	const values = watch();

	const calculatorCallback = useCallback(
		async (responseData) => {
			console.log("--------------------------------------");
			console.log("INSIDE CARGO CALLBACK", responseData);
			console.log("CARGO VALUES", values);
			setValueToLocalStorage(responseData);

			const response = await airAmbulanceCalculationService(
				values,
				serviceId,
				responseData?.user?._id
			);

			setAirAmbulanceData(response);
			return response;
		},
		[serviceId, setValueToLocalStorage, values]
	);

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS
	const onSubmit = async (data) => {
		if (!storedValues) {
			calculatorCallback();
			onOpen();
		} else {
			const response = await airAmbulanceCalculationService(
				data,
				serviceId,
				storedValues?.user?._id
			);
			setAirAmbulanceData(response);

			onOpen();
		}
		console.log("STORED VALUES", storedValues);

		const isVerified = storedValues?.user?.isPhoneVerified;

		if (isValid && !isVerified) {
			onOpen();
		}
	};

	const header_name = (
		<>
			Compassionate Deceased Body <br /> <strong className="text-[#DD3333]">Transportation</strong>
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
							className="input-fields appearance-none "
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
						setDistance={null}
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
							className="input-fields  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
							checked={values.isPackingRequired}
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
					/>
				</FormWrapper>
			</FormProvider>

			<Modal
				onClose={onClose}
				open={open}
				serviceData={airAmbulanceData}
				calculatorCallback={calculatorCallback}
			/>
		</ServiceWrapper>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
// export async function airAmbulanceLoader() {
// 	const cities = await getAllCities();

// 	return cities;
// }

export default AirAmbulance;
