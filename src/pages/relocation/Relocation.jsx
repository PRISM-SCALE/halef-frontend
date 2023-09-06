import {useEffect, useState, useCallback, useMemo} from "react";
import {Controller, FormProvider, useForm} from "react-hook-form";
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
import CustomDropdown from "../../components/forms/CustomDropdown";

// * INITIAL FORM VALUES
const INITIAL_VALUES = {
	pickup: "",
	dropoff: "",
	originLocation: {},
	destinationLocation: {},
	insurance: false,
	houseCapacity: "",
	vehicle: "",
	packing: "",
	goodsValue: "",
	distance: "",
	isDifferentState: false,
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
		control,
	} = methods;

	const values = watch();

	//* STATES
	const [relocationData, setRelocationData] = useState(null);
	const [distance, setDistance] = useState(null);

	useEffect(() => {
		if (values.pickup || values.dropoff) {
			setValue("vehicle", "");
			setValue("distance", "");
		}
	}, [setValue, values.dropoff, values.pickup]);

	useEffect(() => {
		if (distance !== null) {
			setValue("distance", Number(distance.replace(" km", "").replace(",", "")));
		}
		// if (largeScreenAndUp) onClose();
	}, [distance, setValue]);

	// SELECTED HOUSE TYPE
	const selectedHouseCapacity = watch("houseCapacity");

	useEffect(() => {
		if (selectedHouseCapacity) {
			setValue("vehicle", "");
		}
		// if (largeScreenAndUp) onClose();
	}, [selectedHouseCapacity, setValue]);

	const getStateFromLocation = (location) => {
		if (!location || !location.address_components) {
			return "";
		}

		const stateComponent = location.address_components.find((component) =>
			component.types.includes("administrative_area_level_1")
		);

		return stateComponent ? stateComponent.short_name : "";
	};

	const originState = getStateFromLocation(values.originLocation);
	const destinationState = getStateFromLocation(values.destinationLocation);
	const checkOriginLocation = Object.keys(values.originLocation).length !== 0;
	const checkDestinationLocation = Object.keys(values.destinationLocation).length !== 0;
	const isStatesSame = originState === destinationState; // will give true if States are same

	useEffect(() => {
		if (checkOriginLocation && checkDestinationLocation && !isStatesSame) {
			setValue("isDifferentState", true);
		}
	}, [checkDestinationLocation, checkOriginLocation, isStatesSame, setValue]);

	const vehiclesBasedOnDistance = useMemo(() => {
		if (checkOriginLocation && checkDestinationLocation) {
			let selectedHouseType;

			if (!selectedHouseType || !values.houseCapacity || typeof values.distance === "undefined") {
				// return [];
				selectedHouseType = relocationHouseTypes?.filter(({_id}) => _id === selectedHouseCapacity);

				return selectedHouseType[0]?.allowedVehicles?.filter(({relocationRange}) => {
					return relocationRange?.some(({minDistance, maxDistance}) => {
						if (minDistance && maxDistance) {
							return values.distance >= minDistance && values.distance <= maxDistance;
						}
					});
				});
			}
		} else return;
	}, [
		checkDestinationLocation,
		checkOriginLocation,
		relocationHouseTypes,
		selectedHouseCapacity,
		values.distance,
		values.houseCapacity,
	]);

	const filterIfIsInterStateAllowed = useMemo(() => {
		if (checkOriginLocation && checkDestinationLocation) {
			let vehicles;
			let filteredAllowedVehicles;

			if (vehiclesBasedOnDistance?.length !== 0) {
				vehicles = vehiclesBasedOnDistance;
				console.log("vehiclesBasedOnDistance".vehiclesBasedOnDistance);
			}

			if (isStatesSame) {
				filteredAllowedVehicles = vehicles?.filter(({isActive}) => {
					return isActive;
				});
			} else {
				filteredAllowedVehicles = vehicles?.filter(({isActive, isInterStateAllowed}) => {
					return isActive && isInterStateAllowed;
				});
			}

			return filteredAllowedVehicles;
		} else return;
	}, [checkDestinationLocation, checkOriginLocation, isStatesSame, vehiclesBasedOnDistance]);

	const options = filterIfIsInterStateAllowed;

	// * So use filter method to show vehicles based on house type
	// * Check if field value === json value	console.log(watch("houseCapcity") === json value);

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS
	// #region
	const calculatorCallback = useCallback(
		async (responseData) => {
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
		if (!isNaN(values.distance)) {
			if (!storedValues) {
				calculatorCallback();

				onOpen();
			} else {
				const response = await relocationCalculationService(
					data,
					serviceId,
					storedValues?.user?._id
				);
				setRelocationData(response);
				onOpen();
			}

			const isVerified = storedValues?.user?.isPhoneVerified;

			if (isValid && !isVerified) {
				onOpen();
			}
		} else {
			throw new Error("Uh-Oh, looks like something went wrong calculating the distance");
		}
	};
	//#endregion

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
					<GoogleDistanceFinder
						setDistance={setDistance}
						originOptions={{
							types: ["(regions)"],
							componentRestrictions: {country: "in"}, // Restrict to India
						}}
						destinationOptions={{
							types: ["(regions)"],
							componentRestrictions: {country: "in"}, // Restrict to India
						}}
					/>

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
							{relocationHouseTypes?.map((houseType) => {
								const {_id, type} = houseType;
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

					{/* <fieldset>
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
					</fieldset> */}

					<Controller
						name={"vehicle"}
						id={"vehicle"}
						control={control}
						rules={{required: "Choose a vehicle based on your needs"}}
						render={({field}) => {
							return (
								<>
									<CustomDropdown
										ref={field.ref}
										{...field}
										options={options || []}
										name={"vehicle"}
										isDisabled={!watch("houseCapacity")}
									/>
								</>
							);
						}}
					/>

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
