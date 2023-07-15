import {FormProvider, useForm} from "react-hook-form";

// * COMPONENTS
import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";
import GoogleDistanceFinder from "../../components/forms/GoogleDistanceFinder";
import {getVehicles, truckingCalculationService} from "../../utils/api";
import {useLoaderData} from "react-router-dom";
import {useState} from "react";
import {useResponsive} from "../../hooks/useResponsive";
import {Box, Dialog, IconButton} from "@mui/material";
import {Icon} from "@iconify-icon/react";

const INITIAL_VALUES = {
	pickup: "",
	dropoff: "",
	vehicle: "",
	goodsType: "",
	distance: "",
};

const Trucking = () => {
	const {mediumScreenAndUp} = useResponsive();
	const data = useLoaderData();
	const [truckingData, setTruckingData] = useState(null);
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

	const removeEICHER18FEET = data?.filter(({name}) => name !== "EICHER 18 FEET");
	// console.log(removeEICHER18FEET);

	const {
		register,
		formState: {errors},
		handleSubmit,
		// formState,
		// reset,
	} = methods;

	// useEffect(() => {
	// 	if (formState.isSubmitSuccessful) {
	// 		reset({...INITIAL_VALUES});

	// 	}
	// }, [clearErrors, formState, reset]);

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS
	const onSubmit = async (data) => {
		const responseData = await truckingCalculationService(data);
		setTruckingData(responseData);
	};

	const header_name = <strong className="text-[#DD3333]">Trucking</strong>;

	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />

			{/* FORMS */}
			<div className="service-layout">
				<div className="w-full">
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
									{removeEICHER18FEET?.map(({_id, name}) => {
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
									{[
										"industrial_machinery",
										"household_goods",
										"parcels_&_lugguage",
										"fruits_&_vegetables",
										"FMCG",
										"Healthcare",
										"Grocery",
										"liquids_&_barrels",
										"Chemicals",
										"Fertilizers",
									].map((item) => {
										return (
											<option key={item} value={item}>
												{item.toUpperCase().replaceAll("_", " ")}
											</option>
										);
									})}
								</select>
								{errors.goodsType && (
									<p role="alert" className="text-[#ef4444] leading-none mt-1">
										{errors.goodsType?.message}
									</p>
								)}
							</div>

							<Button buttonText="calculate" onClick={handleClickOpen} />
						</FormWrapper>
					</FormProvider>
				</div>
				{mediumScreenAndUp && (
					<>
						{truckingData ? (
							<div className="w-full md:w-[30%] flex flex-col justify-between p-6">
								<span className="text-2xl">Freight Cost: ₹{truckingData?.total}/-</span>
							</div>
						) : (
							<div className="text-center border bg-slate-50 border-slate-200 border-solid rounded-sm p-4 uppercase flex items-center justify-center">
								<h1>Please enter the details to get calculated results</h1>
							</div>
						)}
					</>
				)}
			</div>

			{!mediumScreenAndUp && (
				<Dialog fullScreen open={open} onClose={handleClose}>
					<Box className="text-right mb-6">
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<Icon icon="lucide:x" />
						</IconButton>
					</Box>

					{truckingData ? (
						<div className="w-full flex flex-col justify-between p-6">
							<span className="text-2xl">Freight Cost: ₹{truckingData?.total}/-</span>
						</div>
					) : (
						<div className="text-center border bg-slate-50 border-slate-200 border-solid rounded-sm p-4 uppercase flex items-center justify-center">
							<h1>Please enter the details to get calculated results</h1>
						</div>
					)}
				</Dialog>
			)}
		</ServiceWrapper>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export async function truckingLoader() {
	const vehicles = await getVehicles();

	return vehicles;
}

export default Trucking;
