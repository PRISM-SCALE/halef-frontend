import {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

// * UTILS
// import {getAllCities} from "../../utils/api";

// * COMPONENTS
import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";
import GoogleDistanceFinder from "../../components/forms/GoogleDistanceFinder";
import {airAmbulanceCalculationService} from "../../utils/api";
import CalculatorResultLayout from "../../components/CalculatorResultLayout";
import {useResponsive} from "../../hooks/useResponsive";
import CalculatorResultItem from "../../components/CalculatorResultItem";
import {Box, Dialog, IconButton} from "@mui/material";
import {Icon} from "@iconify-icon/react";

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
	const {mediumScreenAndUp} = useResponsive();
	const [isChecked, setIsChecked] = useState(false);
	const [airAmbulanceData, setAirAmbulanceData] = useState(null);

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
		// setError,
		// getValues,
	} = methods;

	// useEffect(() => {
	// 	if (getValues("pickup") === getValues("dropoff")) {
	// 		setError("pickup", `${getValues("pickup")} cannot be the same as ${getValues("dropoff")}`);
	// 		setError("dropoff", `${getValues("dropoff")} cannot be the same as ${getValues("pickup")}`);
	// 	}
	// }, [getValues, setError]);

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS
	const onSubmit = async (data) => {
		const responseData = await airAmbulanceCalculationService(data);
		setAirAmbulanceData(responseData);
	};

	const header_name = (
		<>
			Air <strong className="text-[#DD3333]">Ambulance</strong>
		</>
	);
	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />
			<div className="service-layout">
				<div className="w-full">
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

							<GoogleDistanceFinder
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

							{/* cost 5000/- */}
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

							<Button
								buttonText={
									watch("region") === "international"
										? "coming soon"
										: watch("region") === "domestic"
										? "calculate"
										: "calculate"
								}
								disabled={watch("region") === "international"}
								onClick={handleClickOpen}
							/>
						</FormWrapper>
					</FormProvider>
				</div>
				{mediumScreenAndUp && airAmbulanceData ? (
					<CalculatorResultLayout
						imageName={"AIR AMBULANCE"}
						// imageUrl={relocationData?.vehicleImage}
					>
						{airAmbulanceData?.airAmbulanceCost.map(({name, cost, unit}, index) => {
							return <CalculatorResultItem key={index} title={name} value={cost} unit={unit} />;
						})}
					</CalculatorResultLayout>
				) : (
					<div className="text-center border bg-slate-50 border-slate-200 border-solid rounded-sm p-4 uppercase flex items-center justify-center">
						<h1>Please enter the details to get calculated results</h1>
					</div>
				)}
			</div>

			{!mediumScreenAndUp && (
				<Dialog fullScreen open={open} onClose={handleClose}>
					<Box className="text-right mb-6">
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<Icon icon="lucide:x" />
						</IconButton>
					</Box>

					{airAmbulanceData ? (
						<CalculatorResultLayout
							imageName={airAmbulanceData?.vehicleName}
							imageUrl={airAmbulanceData?.vehicleImage}
						>
							{airAmbulanceData?.relocationCost.map(({name, cost, unit}, index) => {
								return <CalculatorResultItem key={index} title={name} value={cost} unit={unit} />;
							})}
						</CalculatorResultLayout>
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
// export async function airAmbulanceLoader() {
// 	const cities = await getAllCities();

// 	return cities;
// }

export default AirAmbulance;
