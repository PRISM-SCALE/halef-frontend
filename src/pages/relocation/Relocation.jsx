import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

// * COMPONENTS
import Header from "../../components/Header";
import GoogleDistanceFinder from "../../components/GoogleDistanceFinder";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";

// ---------------------------------------------------------------------
// * RELOCATION FORM COMPONENT START

const INITIAL_VALUES = {
	pickup: "",
	dropoff: "",
	insurance: false,
	houseCapcity: "",
	vehicle: "",
	packingtype: "",
	goodsValue: "",
};

const Relocation = () => {
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
			Relocation - <strong className="text-[#DD3333]">Packers and Movers</strong>
		</>
	);
	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />

			<FormProvider {...methods}>
				<FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<GoogleDistanceFinder />

					<div>
						<label htmlFor="houseCapcity" className="text-[#f8bf02]">
							House Type
						</label>
						<select
							name="houseCapcity"
							className="input-fields appearance-none focus:outline-[#dd3333]"
							placeholder="Choose your house capacity"
							{...register("houseCapacity", {required: "Please select your house capacity size"})}
						>
							<option value="">Choose your house capacity</option>
							<option value="1RK">1RK</option>
							<option value="1BHK">1BHK</option>
							<option value="2BHK">2BHK</option>
							<option value="3BHK">3BHK</option>
						</select>
						{errors.houseCapacity && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.houseCapacity?.message}
							</p>
						)}
					</div>

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
						<label htmlFor="packingtype" className="text-[#f8bf02]">
							Packaging Type
						</label>
						<select
							name="packingtype"
							className="input-fields appearance-none focus:outline-[#dd3333]"
							placeholder="Choose a packing type"
							{...register("packingType", {required: "Choose a packing type"})}
						>
							<option value="">Choose your packing</option>
							<option value="NOT REQUIRED ">NOT REQUIRED</option>
							<option value="SEMI PACKING">SEMI PACKING</option>
							<option value="FULL PACKING ">FULL PACKING </option>
							<option value="FRAGILE PACKING ">FRAGILE PACKING </option>
						</select>
						{errors.packingType && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.packingType?.message}
							</p>
						)}
					</div>

					<div className="flex items-center gap-2">
						<label htmlFor="insurance">Insurance</label>
						<input
							type="checkbox"
							name="insurance"
							id="relocation-insurance"
							{...register("insurance")}
							checked={isChecked}
							onChange={() => setIsChecked(!isChecked)}
						/>
					</div>

					{isChecked && (
						<div>
							<label htmlFor="goodsValue" className="text-[#f8bf02]">
								Your Goods Value
							</label>
							<input
								name="goodsValue"
								className="input-fields focus:outline-[#dd3333]"
								placeholder="Enter your goods value"
								{...register("goodsValue", {required: "Please enter your value of the goods"})}
								aria-invalid={errors.goodsValue ? "true" : "false"}
							/>
							{errors.goodsValue && (
								<p role="alert" className="text-[#ef4444] leading-none mt-1">
									{errors.goodsValue?.message}
								</p>
							)}
						</div>
					)}

					<Button buttonText="calculate" />
				</FormWrapper>
			</FormProvider>
		</ServiceWrapper>
	);
};

export default Relocation;
