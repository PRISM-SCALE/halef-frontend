import {useEffect, useState} from "react";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {Autocomplete} from "@react-google-maps/api";

// * COMPONENTS
import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import FormWrapper from "../../components/forms/FormWrapper";
import GoogleInput from "../../components/forms/GoogleInput";
import Button from "../../components/forms/Button";

const INITIAL_VALUES = {
	pickup: "",
	dropoff: "",
	area: "",
	goodsType: "",
	durationInDays: "",
	packingType: "",
};

const Warehouse = () => {
	const [pickupAutocomplete, setPickupAutocomplete] = useState(null);

	const methods = useForm({
		defaultValues: {...INITIAL_VALUES},
	});

	const {
		register,
		control,
		formState: {errors},
		handleSubmit,
		formState,
		reset,
		clearErrors,
		setValue,
	} = methods;

	const onLoadPickup = (autocomplete) => {
		console.log("pickup autocomplete: ", autocomplete);
		setPickupAutocomplete(autocomplete);
	};

	const onPlaceChangedForPickup = () => {
		if (pickupAutocomplete !== null) {
			const place = pickupAutocomplete.getPlace();
			console.log(place);
			if (place) {
				setValue("pickup", place.formatted_address);
			}
		} else {
			console.log("Pickup Autocomplete is not loaded yet!");
		}
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset({...INITIAL_VALUES});

			clearErrors({...INITIAL_VALUES});
		}
	}, [clearErrors, formState, reset]);

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS
	const onSubmit = (data) => {
		console.log(data);
	};

	const header_name = <strong className="text-[#DD3333]">Warehousing</strong>;

	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />

			{/* FORMS */}
			<FormProvider {...methods}>
				<FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label htmlFor="pickup" className="text-[#f8bf02]">
							Pickup Location
						</label>
						<Controller
							name={"pickup"}
							id={"pickup"}
							control={control}
							rules={{required: "Please enter a pickup address"}}
							render={({field}) => {
								return (
									<>
										<Autocomplete onLoad={onLoadPickup} onPlaceChanged={onPlaceChangedForPickup}>
											<GoogleInput placeholder="Pickup Address" ref={field.ref} {...field} />
										</Autocomplete>
										{errors.pickup && (
											<p role="alert" className="text-[#ef4444] leading-none mt-1">
												{errors.pickup.message}
											</p>
										)}
									</>
								);
							}}
						/>
					</div>

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
							<option value="Household">Household</option>
							<option value="Electronic & White Goods">Electronic & White Goods</option>
							<option value="Furnitures">Furnitures</option>
							<option value="Industrial & Commercial Goods">Industrial & Commercial Goods</option>
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
							<option value="">Choose your goods type</option>
							<option value="0-50sqft">0-50 SQFT (100 CFT)</option>
							<option value="100sqft">100 SQFT (200 CFT)</option>
							<option value="150sqft">150 SQFT (300 CFT)</option>
							<option value="200sqft">200 SQFT (400 CFT)</option>
						</select>
						{errors.area && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.area?.message}
							</p>
						)}
					</div>

					<div>
						<label htmlFor="durationInDays" className="text-[#f8bf02]">
							Duration in days
						</label>
						<select
							name="durationInDays"
							className="input-fields appearance-none focus:outline-[#dd3333]"
							{...register("durationInDays", {
								required: "Choose one of the options based on your needs",
							})}
						>
							<option value="">Choose your duration</option>
							<option value="15-31days">15-31 Days</option>
							<option value="32-60days">32-60 Days</option>
							<option value="61-200days">61-200 Days</option>
							<option value="201-400days">201-400 Days</option>
							<option value="401++days">401++ Days</option>
						</select>
						{errors.durationInDays && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.durationInDays?.message}
							</p>
						)}
					</div>

					<div>
						<label htmlFor="packingtype" className="text-[#f8bf02]">
							Packaging Type
						</label>
						<select
							name="packingtype"
							className="input-fields appearance-none focus:outline-[#dd3333]"
							placeholder="Choose a packing type"
							{...register("packingType", {required: "Choose a packing type"})}
						>
							<option value="">Choose your packing</option>
							<option value="NOT REQUIRED ">NOT REQUIRED</option>
							<option value="SEMI PACKING">SEMI PACKING</option>
							<option value="FULL PACKING ">FULL PACKING </option>
							<option value="FRAGILE PACKING ">FRAGILE PACKING </option>
						</select>
						{errors.packingType && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.packingType?.message}
							</p>
						)}
					</div>

					<Button buttonText="calculate" />
				</FormWrapper>
			</FormProvider>
		</ServiceWrapper>
	);
};

export default Warehouse;
