import {useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";

// * COMPONENTS
import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import GoogleDistanceFinder from "../../components/GoogleDistanceFinder";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";

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
	const methods = useForm({
		defaultValues: {...INITIAL_VALUES},
	});

	const {
		register,
		formState: {errors},
		handleSubmit,
		formState,
		reset,
		clearErrors,
	} = methods;

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset({...INITIAL_VALUES});

			clearErrors({...INITIAL_VALUES});
		}
	}, [clearErrors, formState, reset]);

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS
	const onSubmit = (data) => {
		console.log(data);
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

					<GoogleDistanceFinder />

					<div className="flex items-center justify-between gap-4 flex-col md:flex-row">
						<div className="w-full">
							<label htmlFor="docType" className="text-[#f8bf02]">
								Select Document Type
							</label>
							<select
								name="docType"
								className="input-fields appearance-none focus:outline-[#dd3333]"
								{...register("docType", {required: "Please select your document type"})}
							>
								<option value="">Choose your document type</option>
								<option value="document">Document</option>
								<option value="non-document">Non Document</option>
							</select>
							{errors.docType && (
								<p role="alert" className="text-[#ef4444] leading-none mt-1">
									{errors.docType?.message}
								</p>
							)}
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
					</div>

					{/* DIMENSIONS */}
					<div className="flex items-center justify-between gap-4 flex-col md:flex-row">
						<div className="w-full">
							<label htmlFor="length" className="text-[#f8bf02]">
								Length (cm)
							</label>
							<input
								name="length"
								type="number"
								className="input-fields focus:outline-[#dd3333] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
								placeholder="Length of your cargo"
								{...register("length", {required: "Please enter length of the goods"})}
								aria-invalid={errors.length ? "true" : "false"}
							/>
							{errors.length && (
								<p role="alert" className="text-[#ef4444] leading-none mt-1">
									{errors.length?.message}
								</p>
							)}
						</div>

						<div className="w-full">
							<label htmlFor="width" className="text-[#f8bf02]">
								Width (cm)
							</label>
							<input
								name="width"
								type="number"
								className="input-fields focus:outline-[#dd3333] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								placeholder="Width of your cargo"
								{...register("width", {required: "Please enter width of the goods"})}
								aria-invalid={errors.width ? "true" : "false"}
							/>
							{errors.width && (
								<p role="alert" className="text-[#ef4444] leading-none mt-1">
									{errors.width?.message}
								</p>
							)}
						</div>

						<div className="w-full">
							<label htmlFor="height" className="text-[#f8bf02]">
								Height (cm)
							</label>
							<input
								name="height"
								type="number"
								className="input-fields focus:outline-[#dd3333] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								placeholder="Height of your cargo"
								{...register("height", {required: "Please enter height of the goods"})}
								aria-invalid={errors.height ? "true" : "false"}
							/>
							{errors.height && (
								<p role="alert" className="text-[#ef4444] leading-none mt-1">
									{errors.height?.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<label htmlFor="shipmentService" className="text-[#f8bf02]">
							Select Shipment Service
						</label>
						<select
							name="shipmentService"
							className="input-fields appearance-none focus:outline-[#dd3333]"
							{...register("shipmentService", {required: "Please select your shipment service"})}
						>
							<option value="">Choose your shipment service</option>
							<option value="groundExpress">Ground Express</option>
							<option value="airCargo">Air Cargo</option>
							<option value="priorityExpress">Priority Express</option>
						</select>
						{errors.shipmentService && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.shipmentService?.message}
							</p>
						)}
					</div>

					<Button buttonText="calculate" />
				</FormWrapper>
			</FormProvider>
		</ServiceWrapper>
	);
};

export default Cargo;
