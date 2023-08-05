import {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {useLoaderData} from "react-router-dom";

// * UTILS
import {getVehicles, truckingCalculationService} from "../../utils/api";

// * HOOKS
import useToggle from "../../hooks/useToggle";
import useLocalStorage from "../../hooks/useLocalStorage";

// * COMPONENTS
import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";
import GoogleDistanceFinder from "../../components/forms/GoogleDistanceFinder";
import Modal from "../../components/Modal";

const INITIAL_VALUES = {
	pickup: "",
	dropoff: "",
	vehicle: "",
	goodsType: "",
	distance: "",
};

const Trucking = () => {
	const data = useLoaderData();
	const [truckingData, setTruckingData] = useState(null);

	const {toggle: open, onOpen, onClose} = useToggle();
	// eslint-disable-next-line no-unused-vars
	const [storedValues, setValues] = useLocalStorage("userData");

	const methods = useForm({
		defaultValues: {...INITIAL_VALUES},
	});

	const removeEICHER18FEET = data?.filter(({name}) => name !== "EICHER 18 FEET");

	const {
		register,
		formState: {errors, isValid},
		handleSubmit,
		// formState,
		// reset,
	} = methods;

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS
	const onSubmit = async (data) => {
		const responseData = await truckingCalculationService(data);
		setTruckingData(responseData);

		onOpen();
		console.log("STORED VALUES", storedValues);

		const isVerified = storedValues?.user?.isPhoneVerified;

		if (isValid && !isVerified) {
			onOpen();
		}
	};

	const header_name = <strong className="text-[#DD3333]">Trucking</strong>;

	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />

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

					<Button buttonText="calculate" />
				</FormWrapper>
			</FormProvider>

			<Modal onClose={onClose} open={open} serviceData={truckingData} />
		</ServiceWrapper>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export async function truckingLoader() {
	const vehicles = await getVehicles();

	return vehicles;
}

export default Trucking;
