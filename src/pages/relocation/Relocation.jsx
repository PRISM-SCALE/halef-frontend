import {useEffect, useState, useCallback} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {defer, useLoaderData, useLocation} from "react-router-dom";

// * HOOKS
import useLocalStorage from "../../hooks/useLocalStorage";
import useToggle from "../../hooks/useToggle";

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
import Alert from "../../components/Alert";

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
	const location = useLocation();

	const [storedValues, setValueToLocalStorage] = useLocalStorage("userData");

	const serviceId = location.search.replace(/^\?id=/, "");

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

		// if (largeScreenAndUp) onClose();
	}, [distance, setValue]);

	const selectedHouseCapacity = watch("houseCapacity");

	// * So use filter method to show vehicles based on house type
	// * Check if field value === json value	console.log(watch("houseCapcity") === json value);
	const truckData = relocationHouseTypes.filter(({_id}) => _id === selectedHouseCapacity);

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS

	const calculatorCallback = useCallback(
		async (responseData) => {
			console.log("--------------------------------------");
			console.log("INSIDE CALLBACK", responseData);
			console.log("RELOCATION VALUES", values);
			setValueToLocalStorage(responseData);

			const response = await relocationCalculationService(
				values,
				serviceId,
				responseData?.user?._id
			);

			setRelocationData(response);
			return response;
		},
		[serviceId, setValueToLocalStorage, values]
	);

	const onSubmit = async (data) => {
		console.log("SUBMIT FROM RELOCATION FILE", storedValues);

		if (isNaN(values.distance)) {
			if (!storedValues) {
				console.log("--------------------------------------");
				console.log("NO STORED START");

				calculatorCallback();

				onOpen();
				console.log("NO STORED COMPLETED");
				console.log("--------------------------------------");
			} else {
				console.log("--------------------------------------");

				console.log("ON SUBMIT 2", storedValues?.user?._id);
				const response = await relocationCalculationService(
					data,
					serviceId,
					storedValues?.user?._id
				);
				setRelocationData(response);
				onOpen();
				console.log("ON SUBMIT 2 COMPLETED");

				console.log("--------------------------------------");
				console.log("--------------------------------------");
			}

			const isVerified = storedValues?.user?.isPhoneVerified;

			console.log("STORED VALUES", storedValues);

			if (isValid && !isVerified) {
				console.log("SUBMITTED");

				onOpen();
			}
		} else {
			throw new Error("Uh-Oh, looks like something went wrong calculating the distance");
		}
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
				<FormWrapper
					onSubmit={handleSubmit(onSubmit)}
					// method="post"
					// action="/relocation"
				>
					{console.log(isNaN(values.distance))}
					{values.distance ? (
						<Alert
							bgColor="bg-blue-50"
							textColor="text-blue-700"
							icon="charm:info"
							message={`Your distance calculated based on your location points is`}
							value={<strong>{`${values.distance}km`}</strong>}
						/>
					) : isNaN(values.distance) ? (
						<Alert
							bgColor="bg-red-50"
							textColor="text-red-700"
							icon="ic:round-error-outline"
							message={`Your locations cannot be the same, please provide a valid pick-up and drop location`}
						/>
					) : null}
					<GoogleDistanceFinder setDistance={setDistance} />

					{/* <GoogleAutocomplete /> */}

					<fieldset>
						<label htmlFor="houseCapacity" className="text-[#f8bf02]">
							House Type
						</label>
						<select
							name="houseCapacity"
							className="input-fields appearance-none "
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
							className="input-fields appearance-none "
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
							className="input-fields appearance-none "
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
								className="input-fields  appearance-none"
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
			</FormProvider>

			<Modal
				onClose={onClose}
				open={open}
				serviceData={relocationData}
				calculatorCallback={calculatorCallback}
			/>
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
