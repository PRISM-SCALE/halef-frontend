import {useState} from "react";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {Autocomplete} from "@react-google-maps/api";

// * COMPONENTS
import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import GoogleInput from "../../components/forms/GoogleInput";
import Button from "../../components/forms/Button";
import {getPackageTypes, warehouseCalculationService} from "../../utils/api";
import {useLoaderData} from "react-router-dom";

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
	const [pickupAutocomplete, setPickupAutocomplete] = useState(null);

	const methods = useForm({
		defaultValues: {...INITIAL_VALUES},
	});

	const {
		register,
		control,
		formState: {errors},
		handleSubmit,
		// formState,
		// reset,
		setValue,
	} = methods;

	const onLoadPickup = (autocomplete) => {
		// console.log("pickup autocomplete: ", autocomplete);
		setPickupAutocomplete(autocomplete);
	};

	const onPlaceChangedForPickup = () => {
		if (pickupAutocomplete !== null) {
			const place = pickupAutocomplete.getPlace();
			// console.log(place);
			if (place) {
				setValue("selectCity", place.formatted_address);
			}
		} else {
			console.log("selectCity Autocomplete is not loaded yet!");
		}
	};

	// useEffect(() => {
	// 	if (formState.isSubmitSuccessful) {
	// 		reset({...INITIAL_VALUES});
	// 	}
	// }, [ formState, reset]);

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS
	const onSubmit = async (data) => {
		const responseData = await warehouseCalculationService(data);
		setWarehouse(responseData);
	};

	const header_name = <strong className="text-[#DD3333]">Warehousing</strong>;

	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />

			{warehouse ? (
				<div className="flex gap-4 mb-6">
					<span className="text-2xl">STORAGE COST: ₹{warehouse?.storageCost}/-</span>
					<span className="text-2xl">PACKAGE COST: ₹{warehouse?.packageCost}/-</span>
					<span className="text-2xl">TOTAL: ₹{warehouse?.total}/-</span>
				</div>
			) : null}

			{/* FORMS */}
			<FormProvider {...methods}>
				<FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<fieldset>
						<label htmlFor="selectCity" className="text-[#f8bf02]">
							Select a warehouse location
						</label>
						<Controller
							name={"selectCity"}
							id={"selectCity"}
							control={control}
							rules={{required: "Please enter a pickup address"}}
							render={({field}) => {
								return (
									<>
										<Autocomplete onLoad={onLoadPickup} onPlaceChanged={onPlaceChangedForPickup}>
											<GoogleInput
												name="selectCity"
												placeholder="Warehouse location"
												ref={field.ref}
												{...field}
											/>
										</Autocomplete>
										{errors.selectCity && (
											<p role="alert" className="text-[#ef4444] leading-none mt-1">
												{errors.selectCity.message}
											</p>
										)}
									</>
								);
							}}
						/>
					</fieldset>

					<div>
						<label htmlFor="goodsType" className="text-[#f8bf02]">
							Select the type of your goods
						</label>
						<select
							name="goodsType"
							className="input-fields appearance-none focus:outline-[#dd3333]"
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
					</div>

					<div>
						<label htmlFor="area" className="text-[#f8bf02]">
							Select the area of your goods
						</label>
						<select
							name="area"
							className="input-fields appearance-none focus:outline-[#dd3333]"
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
					</div>

					<fieldset>
						<label htmlFor="durationInDays" className="text-[#f8bf02]">
							Storage duration in days
						</label>
						<input
							name="durationInDays"
							placeholder="How long should your goods be stored"
							type="number"
							className="input-fields appearance-none focus:outline-[#dd3333]"
							{...register("durationInDays", {
								required: "Provide your duration to be stored in the warehouse",
							})}
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
							className="input-fields appearance-none focus:outline-[#dd3333]"
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
						{errors.packingType && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.packingType?.message}
							</p>
						)}
					</fieldset>

					<Button buttonText="calculate" />
				</FormWrapper>
			</FormProvider>
		</ServiceWrapper>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export async function warehouseLoader() {
	const packingTypes = await getPackageTypes();

	return packingTypes;
}

export default Warehouse;
