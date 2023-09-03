import {useCallback, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

// * UTILS
import {courierCargoCalculationService} from "../../utils/api";

// * HOOKS
import useToggle from "../../hooks/useToggle";
import useLocalStorage from "../../hooks/useLocalStorage";

// * COMPONENTS
import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import GooglePincodeForm from "../../components/forms/GooglePincodeForm";
import Button from "../../components/forms/Button";
import Modal from "../../components/Modal";
import {useLocation} from "react-router-dom";

const INITIAL_VALUES = {
	region: "",
	docType: "",
	pickup: "",
	dropoff: "",
	weight: null,
	length: null,
	width: null,
	height: null,
	shipmentService: "",
};

const Cargo = () => {
	const {toggle: open, onOpen, onClose} = useToggle();
	const [storedValues, setValueToLocalStorage] = useLocalStorage("userData");
	const [cargoCost, setCargoCost] = useState(null);
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
		// formState,
		// reset,
	} = methods;

	const values = watch();

	// useEffect(() => {
	// 	if (formState.isSubmitSuccessful) {
	// 		reset({...INITIAL_VALUES});
	// 	}
	// }, [formState, reset]);

	const calculatorCallback = useCallback(
		async (responseData) => {
			setValueToLocalStorage(responseData);

			const response = await courierCargoCalculationService(
				values,
				serviceId,
				responseData?.user?._id
			);

			setCargoCost(response);
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
			const response = await courierCargoCalculationService(
				data,
				serviceId,
				storedValues?.user?._id
			);
			setCargoCost(response);
			onOpen();
		}

		const isVerified = storedValues?.user?.isPhoneVerified;

		if (isValid && !isVerified) {
			onOpen();
		}
	};

	const header_name = (
		<>
			Courier and - <strong className="text-[#DD3333]">Cargo</strong>
		</>
	);
	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />

			{/* FORM */}

			<FormProvider {...methods}>
				<FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<fieldset>
						<label htmlFor="region" className="text-[#f8bf02]">
							Select Your Region
						</label>
						<select
							name="region"
							className="input-fields appearance-none "
							{...register("region", {required: "Please select your region"})}
						>
							<option value="">Choose your region</option>
							{["domestic", "international"].map((region) => {
								return (
									<option value={region} key={region}>
										{region.toUpperCase()}
									</option>
								);
							})}
						</select>
						{errors.region && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.region?.message}
							</p>
						)}
					</fieldset>

					{/* <GoogleDistanceFinder /> */}
					<GooglePincodeForm />

					<div className="flex items-center justify-between gap-4 flex-col md:flex-row">
						<fieldset className="w-full">
							<label htmlFor="docType" className="text-[#f8bf02]">
								Select Document Type
							</label>
							<select
								disabled={!watch("region") || values.region === "international"}
								name="docType"
								className="input-fields appearance-none "
								{...register("docType", {required: "Please select your document type"})}
							>
								<option value="">Choose your document type</option>
								{["document", "non-document"].map((docType) => {
									return (
										<option value={docType} key={docType}>
											{docType.toUpperCase()}
										</option>
									);
								})}
							</select>
							{errors.docType && (
								<p role="alert" className="text-[#ef4444] leading-none mt-1">
									{errors.docType?.message}
								</p>
							)}
						</fieldset>

						<fieldset className="w-full">
							<label htmlFor="weight" className="text-[#f8bf02]">
								Weight (kg)
							</label>
							<input
								disabled={!watch("region") || values.region === "international"}
								name="weight"
								type="number"
								className="input-fields  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								placeholder="Enter your goods weight"
								{...register("weight", {
									required: "Please enter the exact weight of your goods",
								})}
								aria-invalid={errors.weight ? "true" : "false"}
							/>
							{errors.weight && (
								<p role="alert" className="text-[#ef4444] leading-none mt-1">
									{errors.weight?.message}
								</p>
							)}
						</fieldset>
					</div>

					{/* DIMENSIONS */}
					<div className="flex items-center justify-between gap-4 flex-col md:flex-row">
						<fieldset className="w-full">
							<label htmlFor="length" className="text-[#f8bf02]">
								Length (cm)
							</label>
							<input
								disabled={!watch("region") || values.region === "international"}
								name="length"
								type="number"
								className="input-fields  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
								placeholder="Length of your cargo"
								{...register("length", {required: "Please enter length of the goods"})}
								aria-invalid={errors.length ? "true" : "false"}
							/>
							{errors.length && (
								<p role="alert" className="text-[#ef4444] leading-none mt-1">
									{errors.length?.message}
								</p>
							)}
						</fieldset>

						<fieldset className="w-full">
							<label htmlFor="width" className="text-[#f8bf02]">
								Width (cm)
							</label>
							<input
								disabled={!watch("region") || values.region === "international"}
								name="width"
								type="number"
								className="input-fields  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								placeholder="Width of your cargo"
								{...register("width", {required: "Please enter width of the goods"})}
								aria-invalid={errors.width ? "true" : "false"}
							/>
							{errors.width && (
								<p role="alert" className="text-[#ef4444] leading-none mt-1">
									{errors.width?.message}
								</p>
							)}
						</fieldset>

						<fieldset className="w-full">
							<label htmlFor="height" className="text-[#f8bf02]">
								Height (cm)
							</label>
							<input
								disabled={!watch("region") || values.region === "international"}
								name="height"
								type="number"
								className="input-fields  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								placeholder="Height of your cargo"
								{...register("height", {required: "Please enter height of the goods"})}
								aria-invalid={errors.height ? "true" : "false"}
							/>
							{errors.height && (
								<p role="alert" className="text-[#ef4444] leading-none mt-1">
									{errors.height?.message}
								</p>
							)}
						</fieldset>
					</div>

					<fieldset>
						<label htmlFor="shipmentService" className="text-[#f8bf02]">
							Select Shipment Service
						</label>
						<select
							disabled={!watch("region") || values.region === "international"}
							name="shipmentService"
							className="input-fields appearance-none "
							{...register("shipmentService", {
								required: "Please select your shipment service",
							})}
						>
							<option value="">Choose your shipment service</option>
							{["ground_express", "air_cargo", "priority_express"].map((shipment) => {
								return (
									<option value={shipment} key={shipment}>
										{shipment.toUpperCase().replace("_", " ")}
									</option>
								);
							})}
						</select>
						{errors.shipmentService && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.shipmentService?.message}
							</p>
						)}
					</fieldset>

					<Button
						buttonText={
							values.region === "international"
								? "coming soon"
								: values.region === "domestic"
								? "calculate"
								: "calculate"
						}
						disabled={!watch("region") || values.region === "international"}
					/>
				</FormWrapper>
			</FormProvider>

			<Modal
				onClose={onClose}
				open={open}
				serviceData={cargoCost}
				calculatorCallback={calculatorCallback}
			/>
		</ServiceWrapper>
	);
};

export default Cargo;
