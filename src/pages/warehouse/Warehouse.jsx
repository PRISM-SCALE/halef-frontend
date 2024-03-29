import {useCallback, useState} from "react";
import {FormProvider, useForm, Controller} from "react-hook-form";
import {useLoaderData, useLocation} from "react-router-dom";

// * UTILS
import {getPackageTypes, warehouseCalculationService} from "../../utils/api";

// * HOOKS
import useToggle from "../../hooks/useToggle";
import useLocalStorage from "../../hooks/useLocalStorage";

// * COMPONENTS
import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";
import Modal from "../../components/Modal";

const CFT_SQFT = [
	{
		name: "0-50 SQFT (100 CFT)",
		cft: 50,
		sqft: 100,
	},
	{
		name: "100 SQFT (200 CFT)",
		cft: 200,
		sqft: 100,
	},
	{
		name: "150 SQFT (300 CFT)",
		cft: 300,
		sqft: 150,
	},
	{
		name: "200 SQFT (400 CFT)",
		cft: 400,
		sqft: 200,
	},
	{
		name: "250 SQFT (500 CFT)",
		cft: 500,
		sqft: 250,
	},
	{
		name: "300 SQFT (600 CFT)",
		cft: 600,
		sqft: 500,
	},
	{
		name: "400 SQFT (800 CFT)",
		cft: 800,
		sqft: 400,
	},
	{
		name: "500 SQFT (1000 CFT)",
		cft: 1000,
		sqft: 500,
	},
	{
		name: "600 SQFT (1200 CFT)",
		cft: 1200,
		sqft: 600,
	},
	{
		name: "700 SQFT (1400 CFT)",
		cft: 1400,
		sqft: 700,
	},
	{
		name: "800 SQFT (1600 CFT)",
		cft: 1600,
		sqft: 800,
	},
	{
		name: "900 SQFT (1800 CFT)",
		cft: 1800,
		sqft: 900,
	},
	{
		name: "1000 SQFT (2000 CFT)",
		cft: 2000,
		sqft: 1000,
	},
	{
		name: "ABOVE 1000 SQFT (2000CFT++)",
		cft: 2001,
		sqft: 1001,
	},
];

const INITIAL_VALUES = {
	selectCity: "",
	area: "",
	goodsType: "",
	durationInDays: "",
	packing: "",
};

const Warehouse = () => {
	const packageData = useLoaderData();
	const [warehouse, setWarehouse] = useState(null);

	const {toggle: open, onOpen, onClose} = useToggle();
	// eslint-disable-next-line no-unused-vars
	const [storedValues, setValueToLocalStorage] = useLocalStorage("userData");

	const location = useLocation();
	const serviceId = location.search.replace(/^\?id=/, "");

	const methods = useForm({
		defaultValues: {...INITIAL_VALUES},
	});

	const {
		register,
		formState: {errors, isValid},
		handleSubmit,
		watch,
		control,
		// formState,
		// reset,
	} = methods;

	const values = watch();

	const calculatorCallback = useCallback(
		async (responseData) => {
			setValueToLocalStorage(responseData);

			const response = await warehouseCalculationService(
				values,
				serviceId,
				responseData?.user?._id
			);

			setWarehouse(response);
			return response;
		},
		[serviceId, setValueToLocalStorage, values]
	);

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS
	const onSubmit = async (data) => {
		if (!storedValues) {
			calculatorCallback();
			onOpen();
		} else {
			const response = await warehouseCalculationService(data, serviceId, storedValues?.user?._id);
			setWarehouse(response);
			onOpen();
		}

		const isVerified = storedValues?.user?.isPhoneVerified;

		if (isValid && !isVerified) {
			onOpen();
		}
	};

	const validateDuration = (value) => {
		if (value > 999) {
			return "Duration cannot exceed 999 days";
		}
		return true;
	};

	const header_name = <strong className="text-[#d40035]">Warehousing</strong>;

	return (
		<ServiceWrapper>
			<Header caption="quote calculator for" title={header_name} />

			<FormProvider {...methods}>
				<FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<fieldset>
						<label htmlFor="selectCity" className="text-[#f8bf02]">
							Select a warehouse location
						</label>
						<select
							name={"selectCity"}
							className="input-fields appearance-none "
							{...register("selectCity", {
								required: "Please select a city to store your goods",
							})}
						>
							<option value="">Select a warehouse location</option>
							{[
								"Ahmedabad",
								"A&N Islands (UT)",
								"Amritsar",
								"Bangalore",
								"Chennai",
								"Calicut",
								"Delhi",
								"Goa",
								"Guwahati",
								"Hyderabad",
								"Jaipur",
								"Kolkata",
								"Kochi",
								"Mumbai",
								"Nagpur",
								"Srinagar",
								"Thiruvananthapuram",
							].map((item) => {
								return (
									<option key={item} value={item}>
										{item.toUpperCase().replaceAll("_", " ")}
									</option>
								);
							})}{" "}
						</select>
						{errors.selectCity && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.selectCity?.message}
							</p>
						)}
					</fieldset>

					<fieldset>
						<label htmlFor="goodsType" className="text-[#f8bf02]">
							Select the type of your goods
						</label>
						<select
							name="goodsType"
							className="input-fields appearance-none "
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
							})}{" "}
						</select>
						{errors.goodsType && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.goodsType?.message}
							</p>
						)}
					</fieldset>

					<fieldset>
						<label htmlFor="area" className="text-[#f8bf02]">
							Select the area of your goods
						</label>
						<select
							name="area"
							className="input-fields appearance-none "
							{...register("area", {
								required: "Choose one of the options based on your goods",
							})}
						>
							<option value="">Choose your area</option>
							{CFT_SQFT?.map(({cft, name}, index) => {
								return (
									<option value={cft} key={index}>
										{name}
									</option>
								);
							})}
						</select>
						{errors.area && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.area?.message}
							</p>
						)}
					</fieldset>

					<fieldset>
						<label htmlFor="durationInDays" className="text-[#f8bf02]">
							Storage duration in days
						</label>
						<Controller
							name="durationInDays"
							control={control}
							defaultValue=""
							render={({field}) => (
								<input
									{...field}
									placeholder="How long should your goods be stored"
									type="number"
									className="input-fields appearance-none"
								/>
							)}
							rules={{
								required: "Provide your duration to be stored in the warehouse",
								validate: validateDuration, // Custom validation function
							}}
						/>

						{errors.durationInDays && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.durationInDays?.message}
							</p>
						)}
					</fieldset>

					<fieldset>
						<label htmlFor="packing" className="text-[#f8bf02]">
							Packaging Type
						</label>
						<select
							name="packing"
							className="input-fields appearance-none "
							placeholder="Choose a packing type"
							{...register("packing", {required: "Choose a packing type"})}
						>
							<option value="">Choose your packing</option>
							{packageData.map(({_id, name}) => {
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

					<Button buttonText="calculate" />
				</FormWrapper>
			</FormProvider>

			<Modal
				onClose={onClose}
				open={open}
				serviceData={warehouse}
				calculatorCallback={calculatorCallback}
			/>
		</ServiceWrapper>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export async function warehouseLoader() {
	const packingTypes = await getPackageTypes();

	return packingTypes;
}

export default Warehouse;
