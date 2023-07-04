import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

// * COMPONENTS
import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import GoogleDistanceFinder from "../../components/GoogleDistanceFinder";
import Button from "../../components/forms/Button";

const INITIAL_VALUES = {
	region: "",
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

					<GoogleDistanceFinder />

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

					<Button buttonText="calculate" />
				</FormWrapper>
			</FormProvider>
		</ServiceWrapper>
	);
};

export default AirAmbulance;
