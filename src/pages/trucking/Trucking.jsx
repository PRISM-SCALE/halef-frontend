import {useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";

// * COMPONENTS
import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";
import GoogleDistanceFinder from "../../components/GoogleDistanceFinder";

const INITIAL_VALUES = {
	pickup: "",
	dropoff: "",
	vehicle: "",
	goodsType: "",
};

const Trucking = () => {
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

	const header_name = <strong className="text-[#DD3333]">Trucking</strong>;

	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />

			{/* FORMS */}
			<FormProvider {...methods}>
				<FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<GoogleDistanceFinder />

					<div>
						<label htmlFor="vehicle" className="text-[#f8bf02]">
							Select vehicle
						</label>
						<select
							name="vehicle"
							className="input-fields appearance-none focus:outline-[#dd3333]"
							placeholder="Choose your truck type"
							{...register("vehicle", {required: "Choose a vehicle based on your needs"})}
						>
							<option value="">Choose your vehicle</option>
							<option value="TATA ACE">TATA ACE</option>
							<option value="MAHINDRA BOLERO PICK UP">MAHINDRA BOLERO PICK UP</option>
							<option value="TATA 407">TATA 407</option>
							<option value="EICHER 14 FEET">EICHER 14 FEET</option>
						</select>
						{errors.vehicle && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.vehicle?.message}
							</p>
						)}
					</div>

					<div>
						<label htmlFor="goodsType" className="text-[#f8bf02]">
							Select the type of your goods
						</label>
						<select
							name="goodsType"
							className="input-fields appearance-none focus:outline-[#dd3333]"
							placeholder="Choose your truck type"
							{...register("goodsType", {
								required: "Choose one of the options based on your goods",
							})}
						>
							<option value="">Choose your goods type</option>
							<option value="Industrial Machinery">Industrial Machinery</option>
							<option value="Household Goods">Household Goods</option>
							<option value="Parcels & Lugguage">Parcels & Lugguage</option>
							<option value="fruits & Vegetables">fruits & Vegetables</option>
						</select>
						{errors.goodsType && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.goodsType?.message}
							</p>
						)}
					</div>

					<Button buttonText="calculate" />
				</FormWrapper>
			</FormProvider>
		</ServiceWrapper>
	);
};

export default Trucking;
