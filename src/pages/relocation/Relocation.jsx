import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {FormProvider, useForm} from "react-hook-form";
import {defer, useLoaderData} from "react-router-dom";

// * HOOKS
import useLocalStorage from "../../hooks/useLocalStorage";
import useToggle from "../../hooks/useToggle";
import {useResponsive} from "../../hooks/useResponsive";

// * UTILS
import {
	getPackageTypes,
	getRelocationHouseType,
	relocationCalculationService,
} from "../../utils/api";

// * COMPONENTS
import Header from "../../components/Header";
import GoogleDistanceFinder from "../../components/forms/GoogleDistanceFinder";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";
import Modal from "../../components/Modal";
import ResultWrapper from "../../components/ResultWrapper";

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
	const {toggle: open, onOpen, onClose} = useToggle();
	// eslint-disable-next-line no-unused-vars
	const [storedValues, setValues] = useLocalStorage("userData");
	const {mediumScreenAndUp} = useResponsive();

	const methods = useForm({
		defaultValues: {...INITIAL_VALUES},
	});

	const {
		register,
		formState: {errors, isValid},
		handleSubmit,
		watch,
		setValue,
	} = methods;
	const values = watch();

	//* STATES
	const [relocationData, setRelocationData] = useState(null);
	const [distance, setDistance] = useState(null);

	useEffect(() => {
		if (distance !== null) {
			setValue("distance", Number(distance.replace(" km", "").replace(",", "")));
		}
	}, [distance, setValue]);

	const selectedHouseCapacity = watch("houseCapacity");

	// * So use filter method to show vehicles based on house type
	// * Check if field value === json value	console.log(watch("houseCapcity") === json value);
	const truckData = relocationHouseTypes.filter(({_id}) => _id === selectedHouseCapacity);

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS

	const onSubmit = async (data) => {
		const responseData = await relocationCalculationService(data);
		setRelocationData(responseData);
		const isVerified = storedValues?.user?.isPhoneVerified;

		if (!mediumScreenAndUp) onOpen();
		console.log("STORED VALUES", storedValues);

		if (isValid && !isVerified && !mediumScreenAndUp) {
			console.log("SUBMITTED");

			onOpen();
		}
	};

	// const handleModal = () => {
	// 	console.log(isSubmitted);
	// 	if (isSubmitted) onOpen();
	// };

	const header_name = (
		<>
			Relocation - <strong className="text-[#DD3333]">Packers and Movers</strong>
		</>
	);

	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />

			<FormProvider {...methods}>
				<ResultWrapper serviceData={relocationData}>
					<FormWrapper
						onSubmit={handleSubmit(onSubmit)}
						// method="post"
						// action="/relocation"
					>
						<Box>{values.distance}</Box>
						<GoogleDistanceFinder setDistance={setDistance} />

						{/* <GoogleAutocomplete /> */}

						<fieldset>
							<label htmlFor="houseCapacity" className="text-[#f8bf02]">
								House Type
							</label>
							<select
								name="houseCapacity"
								className="input-fields appearance-none focus:outline-[#dd3333]"
								placeholder="Choose your house capacity"
								{...register("houseCapacity", {
									required: "Please select your house capacity size",
								})}
							>
								<option value="">Choose your house capacity</option>
								{relocationHouseTypes?.map(({_id, type}) => {
									return (
										<option key={_id} value={_id}>
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
						</fieldset>

						<fieldset>
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
										<option key={_id} value={_id}>
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
						</fieldset>

						<fieldset>
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
								{packingTypes.map(({_id, name}) => {
									return (
										<option key={_id} value={_id}>
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
						</fieldset>

						<fieldset className="flex items-center gap-2">
							<label htmlFor="insurance">Insurance</label>
							<input
								type="checkbox"
								name="insurance"
								id="relocation-insurance"
								{...register("insurance")}
								checked={values.insurance}
							/>
						</fieldset>

						{values.insurance && (
							<fieldset>
								<label htmlFor="goodsValue" className="text-[#f8bf02]">
									Your Goods Value
								</label>
								<input
									name="goodsValue"
									type="number"
									className="input-fields focus:outline-[#dd3333] appearance-none"
									placeholder="Enter your goods value"
									{...register("goodsValue", {required: "Please enter your value of the goods"})}
									aria-invalid={errors.goodsValue ? "true" : "false"}
								/>
								{errors.goodsValue && (
									<p role="alert" className="text-[#ef4444] leading-none mt-1">
										{errors.goodsValue?.message}
									</p>
								)}
							</fieldset>
						)}

						<Button buttonText="calculate" />
					</FormWrapper>
				</ResultWrapper>
			</FormProvider>

			<Modal onClose={onClose} open={open} serviceData={relocationData} />
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
