import {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

// * COMPONENTS
import Header from "../../components/Header";
import GoogleDistanceFinder from "../../components/GoogleDistanceFinder";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";
import {getPackageTypes, getRelocationHouseType} from "../../utils/api";
import {defer, useLoaderData} from "react-router-dom";

// * INITIAL FORM VALUES
const INITIAL_VALUES = {
	pickup: "",
	dropoff: "",
	insurance: false,
	houseCapacity: "",
	vehicle: "",
	packing: "",
	goodsValue: "",
	distance: "",
};

// ---------------------------------------------------------------------
// * RELOCATION FORM COMPONENT START

const Relocation = () => {
	const {relocationHouseTypes, packingTypes} = useLoaderData();
	const [isChecked, setIsChecked] = useState(false);

	const methods = useForm({
		defaultValues: {...INITIAL_VALUES},
	});

	const {
		register,
		formState: {errors},
		handleSubmit,
		watch,
	} = methods;

	// useEffect(() => {
	// 	if (formState.isSubmitSuccessful) {
	// 		reset({...INITIAL_VALUES});
	// 	}
	// }, [formState, reset]);

	const selectedHouseCapacity = watch("houseCapacity");

	// * So use filter method to show vehicles based on house type
	// * Check if field value === json value	console.log(watch("houseCapcity") === json value);
	const truckData = relocationHouseTypes.filter(({type}) => type === selectedHouseCapacity);

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
							{relocationHouseTypes?.map(({_id, type}) => {
								return (
									<option key={_id} value={type}>
										{type}
									</option>
								);
							})}
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
							disabled={!watch("houseCapacity")}
							name="vehicle"
							className="input-fields appearance-none focus:outline-[#dd3333]"
							placeholder="Choose your truck type"
							{...register("vehicle", {required: "Choose a vehicle based on your needs"})}
						>
							<option value="">Choose your vehicle</option>
							{truckData[0]?.allowedVehicles?.map(({_id, name}) => {
								return (
									<option key={_id} value={name}>
										{name}
									</option>
								);
							})}
						</select>
						{errors.vehicle && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.vehicle?.message}
							</p>
						)}
					</div>

					<div>
						<label htmlFor="packing" className="text-[#f8bf02]">
							Packaging Type
						</label>
						<select
							name="packing"
							className="input-fields appearance-none focus:outline-[#dd3333]"
							placeholder="Choose a packing type"
							{...register("packing", {required: "Choose a packing type"})}
						>
							<option value="">Choose your packing</option>
							{packingTypes.map(({_id, code, name}) => {
								return (
									<option key={_id} value={code}>
										{name}
									</option>
								);
							})}
						</select>
						{errors.packing && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.packing?.message}
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

// eslint-disable-next-line react-refresh/only-export-components
export async function relocationLoader() {
	const relocationHouseTypes = await getRelocationHouseType();
	const packingTypes = await getPackageTypes();

	return defer({relocationHouseTypes, packingTypes});
}

export default Relocation;
