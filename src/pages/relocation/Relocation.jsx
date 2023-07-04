import {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

// COMPONENTS
import Header from "../../components/Header";
import GoogleDistanceFinder from "../../components/GoogleDistanceFinder";

// ---------------------------------------------------------------------
// * RELOCATION FORM COMPONENT START

const Relocation = () => {
	const [isChecked, setIsChecked] = useState(false);

	const methods = useForm({
		defaultValues: {
			pickup: "",
			dropoff: "",
		},
	});

	const {
		register,
		formState: {errors},
		handleSubmit,
	} = methods;

	// ------------------------------------------------------
	// * HANDLER FUNCTIONS
	const onSubmit = (data) => console.log(data);

	const header_name = (
		<>
			Relocation - <strong className="text-[#DD3333]">Packers and Movers</strong>
		</>
	);
	return (
		<div className="py-8">
			<Header caption="cost estimation for" title={header_name} />

			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
					<GoogleDistanceFinder />

					<div>
						<label htmlFor="houseCapcity" className="text-[#f8bf02]">
							House Type
						</label>
						<select
							name="houseCapcity"
							className="input-fields appearance-none focus:outline-[#dd3333]"
							placeholder="Choose your house capacity"
							{...register("houseCapacity", {required: "Please select your house capacity size"})}
						>
							<option value="">Choose your house capacity</option>
							<option value="1RK">1RK</option>
							<option value="1BHK">1BHK</option>
							<option value="2BHK">2BHK</option>
							<option value="3BHK">3BHK</option>
						</select>
						{errors.houseCapacity && (
							<p role="alert" className="text-[#ef4444] leading-none">
								{errors.houseCapacity?.message}
							</p>
						)}
					</div>

					<div>
						<label htmlFor="truckType" className="text-[#f8bf02]">
							Truck Type
						</label>
						<select
							name="truckType"
							className="input-fields appearance-none focus:outline-[#dd3333]"
							placeholder="Choose your truck type"
							{...register("truckType", {required: "Choose the truck type based on your needs"})}
						>
							{/* <option selected>Choose your truck type</option> */}
							<option value="TATA ACE">TATA ACE</option>
							<option value="MAHINDRA BOLERO PICK UP">MAHINDRA BOLERO PICK UP</option>
							<option value="TATA 407">TATA 407</option>
							<option value="EICHER 14 FEET">EICHER 14 FEET</option>
						</select>
						{errors.truckType && (
							<p role="alert" className="text-[#ef4444] leading-none">
								{errors.truckType?.message}
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
							{/* <option selected>
							<span className="">Choose your packing</span>
						</option> */}
							<option value="NOT REQUIRED ">NOT REQUIRED</option>
							<option value="SEMI PACKING">SEMI PACKING</option>
							<option value="FULL PACKING ">FULL PACKING </option>
							<option value="FRAGILE PACKING ">FRAGILE PACKING </option>
						</select>
						{errors.packingType && (
							<p role="alert" className="text-[#ef4444] leading-none">
								{errors.packingType?.message}
							</p>
						)}
					</div>

					<div className="flex items-center gap-2">
						<label htmlFor="insurance">Insurance</label>
						<input
							type="checkbox"
							name="insurance"
							id="relocation-insurance"
							{...register("insurance", {required: true})}
							checked={isChecked}
							onChange={() => setIsChecked(!isChecked)}
						/>
					</div>

					{isChecked && (
						<div>
							<label htmlFor="goodsValue" className="text-[#f8bf02]">
								Your Goods Value
							</label>
							<input
								name="goodsValue"
								className="input-fields focus:outline-[#dd3333]"
								placeholder="Enter your goods value"
								{...register("goodsValue", {required: "Please enter your value of the goods"})}
								aria-invalid={errors.goodsValue ? "true" : "false"}
							/>
							{errors.goodsValue && (
								<p role="alert" className="text-[#ef4444] leading-none">
									{errors.goodsValue?.message}
								</p>
							)}
						</div>
					)}

					<button
						type="submit"
						className="px-6 py-3 bg-[#dd3333] text-white uppercase w-1/2 mx-auto"
					>
						calculate
					</button>
				</form>
			</FormProvider>
		</div>
	);
};

export default Relocation;
