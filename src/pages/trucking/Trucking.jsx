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

const INITIAL_VALUES = {
	pickup: "",
	dropoff: "",
	vehicle: "",
	goodsType: "",
	distance: "",
};

const Trucking = () => {
	const [truckingData, setTruckingData] = useState(null);
	const data = useLoaderData();

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

			{truckingData ? (
				<div className="flex gap-4 mb-6">
					<span className="text-2xl">TRANSPORT COST: ₹{truckingData?.transportCost}/-</span>
					<span className="text-2xl">TOTAL: ₹{truckingData?.total}/-</span>
				</div>
			) : null}

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
		</ServiceWrapper>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export async function truckingLoader() {
	const vehicles = await getVehicles();

	return vehicles;
}

export default Trucking;
