import {useCallback, useEffect, useMemo, useState} from "react";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {useLoaderData, useLocation} from "react-router-dom";

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
import Alert from "../../components/Alert";
import CustomDropdown from "../../components/forms/CustomDropdown";

const INITIAL_VALUES = {
	pickup: "",
	dropoff: "",
	originLocation: {},
	destinationLocation: {},
	vehicle: "",
	goodsType: "",
	distance: "",
	isDifferentState: false,
};

const Trucking = () => {
	const data = useLoaderData();
	const location = useLocation();
	const [truckingData, setTruckingData] = useState(null);
	const [distance, setDistance] = useState(null);

	const {toggle: open, onOpen, onClose} = useToggle();
	// eslint-disable-next-line no-unused-vars
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
		// formState,
		// reset,
	} = methods;

	const values = watch();

	useEffect(() => {
		if (values.pickup || values.dropoff) {
			setValue("vehicle", "");
			setValue("distance", "");
		}
	}, [setValue, values.dropoff, values.pickup]);

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
			if (!data || !values || typeof values.distance === "undefined") {
				return [];
			}

			return data?.filter(({truckingRange}) => {
				return truckingRange.some(
					({minDistance, maxDistance}) =>
						values.distance >= minDistance && values.distance <= maxDistance
				);
			});
		} else return;
	}, [checkDestinationLocation, checkOriginLocation, data, values]);

	const filterIfIsInterStateAllowed = useMemo(() => {
		if (checkOriginLocation && checkDestinationLocation) {
			let vehicles;
			let filteredAllowedVehicles;

			if (vehiclesBasedOnDistance.length !== 0) {
				vehicles = vehiclesBasedOnDistance;
				console.log(vehiclesBasedOnDistance);
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
	}, [vehiclesBasedOnDistance, checkDestinationLocation, checkOriginLocation, isStatesSame]);

	const options = filterIfIsInterStateAllowed?.filter(
		({name}) => name !== "EICHER 18 FEET" && name !== "EICHER 19 FEET"
	);

	useEffect(() => {
		if (distance !== null) {
			setValue("distance", Number(distance.replace(" km", "").replace(",", "")));
		}
	}, [distance, setValue]);

	const calculatorCallback = useCallback(
		async (responseData) => {
			setValueToLocalStorage(responseData);

			const response = await truckingCalculationService(values, serviceId, responseData?.user?._id);

			setTruckingData(response);
			return response;
		},
		[serviceId, setValueToLocalStorage, values]
	);

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS
	const onSubmit = async (data) => {
		if (!isNaN(values.distance)) {
			if (!storedValues) {
				calculatorCallback();
				onOpen();
			} else {
				const response = await truckingCalculationService(data, serviceId, storedValues?.user?._id);
				setTruckingData(response);

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

	const header_name = <strong className="text-[#d40035]">Trucking</strong>;
	const isDisabled = Boolean(values.distance) && Boolean(values.pickup) && Boolean(values.dropoff);

	return (
		<ServiceWrapper>
			<Header caption="quote calculator for" title={header_name} />

			<FormProvider {...methods}>
				<FormWrapper onSubmit={handleSubmit(onSubmit)}>
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

					{/* <fieldset>
						<label htmlFor="vehicle" className="text-[#f8bf02]">
							Select vehicle
						</label>
						<select
							name="vehicle"
							disabled={!values.distance}
							className="input-fields appearance-none "
							placeholder="Choose your truck type"
							{...register("vehicle", {required: "Choose a vehicle based on your needs"})}
						>
							<option value="">Choose your vehicle</option>
							{allowedVehiclesBasedOnDistance[0]?.allowedVehicles?.length !== 0 ? (
								<>
									{allowedVehiclesBasedOnDistance[0]?.allowedVehicles?.map(({_id, name}) => {
										return (
											<option key={_id} value={_id}>
												{name}
											</option>
										);
									})}
								</>
							) : (
								<option>Nothing to show here</option>
							)}
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
										options={options}
										name={"vehicle"}
										isDisabled={!isDisabled}
									/>
								</>
							);
						}}
					/>

					<fieldset>
						<label htmlFor="goodsType" className="text-[#f8bf02]">
							Select the type of your goods
						</label>
						<select
							name="goodsType"
							className="input-fields appearance-none "
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
					</fieldset>

					<Button buttonText="calculate" />
				</FormWrapper>
			</FormProvider>

			<Modal
				onClose={onClose}
				open={open}
				serviceData={truckingData}
				calculatorCallback={calculatorCallback}
			/>
		</ServiceWrapper>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export async function truckingLoader() {
	const vehicles = await getVehicles();

	return vehicles;
}

export default Trucking;
