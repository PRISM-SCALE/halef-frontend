import {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

// * COMPONENTS
import Header from "../../components/Header";
import GoogleDistanceFinder from "../../components/forms/GoogleDistanceFinder";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";
import {
	getPackageTypes,
	getRelocationHouseType,
	relocationCalculationService,
} from "../../utils/api";
import {defer, useLoaderData} from "react-router-dom";
import {useResponsive} from "../../hooks/useResponsive";
import {Box, Dialog, IconButton, Typography} from "@mui/material";
import {Icon} from "@iconify-icon/react";
import CalculatorResultLayout from "../../components/CalculatorLayout";

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
	const {mediumScreenAndUp} = useResponsive();

	const [relocationData, setRelocationData] = useState(null);
	const {relocationHouseTypes, packingTypes} = useLoaderData();

	const [isChecked, setIsChecked] = useState(false);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const methods = useForm({
		defaultValues: {...INITIAL_VALUES},
	});

	const {
		register,
		formState: {errors},
		handleSubmit,
		watch,
		getValues,
	} = methods;

	// useEffect(() => {
	// 	if (formState.isSubmitSuccessful) {
	// 		reset({...INITIAL_VALUES});
	// 	}
	// }, [formState, reset]);

	const selectedHouseCapacity = watch("houseCapacity");
	const distance = getValues("distance");

	// * So use filter method to show vehicles based on house type
	// * Check if field value === json value	console.log(watch("houseCapcity") === json value);
	const truckData = relocationHouseTypes.filter(({_id}) => _id === selectedHouseCapacity);

	// console.log("VEHICLE", truckData);
	// console.log("HOUSETYPE", relocationHouseTypes);
	// console.log("PACKING", packingTypes);

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS

	const onSubmit = async (data) => {
		const responseData = await relocationCalculationService(data);
		setRelocationData(responseData);
	};

	const header_name = (
		<>
			Relocation - <strong className="text-[#DD3333]">Packers and Movers</strong>
		</>
	);

	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />

			<div className="service-layout">
				<div className={"w-full"}>
					<FormProvider {...methods}>
						<FormWrapper
							onSubmit={handleSubmit(onSubmit)}
							// method="post"
							// action="/relocation"
						>
							<GoogleDistanceFinder />

							<fieldset>
								<label htmlFor="houseCapcity" className="text-[#f8bf02]">
									House Type
								</label>
								<select
									name="houseCapcity"
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
									checked={isChecked}
									onChange={() => setIsChecked(!isChecked)}
								/>
							</fieldset>

							{isChecked && (
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

							<Button buttonText="calculate" onClick={handleClickOpen} />
						</FormWrapper>
					</FormProvider>
				</div>

				{/* {mediumScreenAndUp && (
					<>
						{relocationData ? (
							<div className="w-[30%] bg-slate-50 flex flex-col justify-between border border-slate-200 border-solid p-6">
								<div className="flex gap-4 mb-6 flex-col">
									<span className="text-2xl">DISTANCE: {distance}km</span>
									<span className="text-2xl">
										TRANSPORT COST: ₹{relocationData?.transportCost}/-
									</span>
									<span className="text-2xl">PACKAGE COST: ₹{relocationData?.packageCost}/-</span>
									<span className="text-2xl">INSURANCE: ₹{relocationData?.insurance}/-</span>
								</div>
								<div>
									<span className="text-2xl">TOTAL: ₹{relocationData?.total}/-</span>
								</div>
							</div>
						) : (
							<div className="text-center border bg-slate-50 border-slate-200 border-solid rounded-sm p-4 uppercase flex items-center justify-center">
								<h1>Please enter the details to get calculated results</h1>
							</div>
						)}
					</>
				)} */}

				<CalculatorResultLayout>
					<Typography variant="subtitle2">DISTANCE</Typography>
					<Typography className="text-2xl">{distance}km</Typography>
				</CalculatorResultLayout>
			</div>

			{!mediumScreenAndUp && (
				<Dialog fullScreen open={open} onClose={handleClose}>
					<Box className="text-right mb-6">
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<Icon icon="lucide:x" />
						</IconButton>
					</Box>

					{relocationData ? (
						<div className="w-full flex flex-col justify-between p-6">
							<div className="flex gap-4 mb-6 flex-col">
								<span className="text-2xl">DISTANCE: {distance}km</span>
								<span className="text-2xl">TRANSPORT COST: ₹{relocationData?.transportCost}/-</span>
								<span className="text-2xl">PACKAGE COST: ₹{relocationData?.packageCost}/-</span>
								<span className="text-2xl">
									INSURANCE: ₹{relocationData?.insurance.toFixed(2)}/-
								</span>
							</div>
							<div>
								<span className="text-2xl">TOTAL: ₹{relocationData?.total.toFixed(2)}/-</span>
							</div>
						</div>
					) : (
						<div className="text-center  rounded-sm p-4 uppercase flex items-center justify-center">
							<h1>Please enter the details to get calculated results</h1>
						</div>
					)}
				</Dialog>
			)}
		</ServiceWrapper>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export async function relocationLoader() {
	const relocationHouseTypes = await getRelocationHouseType();
	const packingTypes = await getPackageTypes();

	return defer({relocationHouseTypes, packingTypes});
}

// eslint-disable-next-line react-refresh/only-export-components
// export async function saveRelocationData({request}) {
// 	const form = await request.formData();

// 	const data = {
// 		pickup: form.get("pickup"),
// 		dropoff: form.get("dropoff"),
// 		insurance: form.get("insurance"),
// 		houseCapacity: form.get("houseCapacity"),
// 		vehicle: form.get("vehicle"),
// 		packing: form.get("packing"),
// 		goodsValue: form.get("goodsValue"),
// 		distance: form.get("distance"),
// 	};

// 	await relocationCalculationService(data);

// 	return null;
// }

export default Relocation;
