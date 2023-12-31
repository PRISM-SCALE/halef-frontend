import {useFormContext} from "react-hook-form";

const ModalForm = () => {
	const {
		register,
		formState: {errors},
	} = useFormContext();

	return (
		<div className="w-full flex flex-col gap-4 p-6">
			<fieldset>
				<label htmlFor="name" className="text-[#f8bf02]">
					Name
				</label>
				<input
					name="name"
					className="input-fields appearance-none "
					placeholder="Enter Your Name"
					{...register("name", {
						required: "Please enter your first name",
					})}
				/>
				{errors.name && (
					<p role="alert" className="text-[#ef4444] leading-none mt-1">
						{errors.name?.message}
					</p>
				)}
			</fieldset>

			<fieldset>
				<label htmlFor="email" className="text-[#f8bf02]">
					Email
				</label>
				<input
					name="email"
					type="email"
					className="input-fields appearance-none "
					placeholder="Enter Your Email"
					{...register("email", {
						required: "Please enter your Email",
						validate: {
							maxLength: (v) => v.length <= 50 || "The email should have at most 50 characters",
							matchPattern: (v) =>
								/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
								"Email address must be a valid address",
						},
					})}
				/>
				{errors.email && (
					<p role="alert" className="text-[#ef4444] leading-none mt-1">
						{errors.email?.message}
					</p>
				)}
			</fieldset>

			<fieldset>
				<label htmlFor="phone" className="text-[#f8bf02]">
					Mobile Number
				</label>
				<input
					name="phone"
					className="input-fields appearance-none "
					placeholder="Enter Your Mobile Number"
					{...register("phone", {
						required: "Please enter your mobile number",
						maxLength: {
							value: 10,
							message: "Mobile number has a limit of 10, please enter a valid number",
						},
					})}
				/>
				{errors.phone && (
					<p role="alert" className="text-[#ef4444] leading-none mt-1">
						{errors.phone?.message}
					</p>
				)}
			</fieldset>
			{/* <fieldset>
				<label htmlFor="service" className="text-[#f8bf02]">
					Services
				</label>
				<select
					name="service"
					className="input-fields appearance-none "
					placeholder="Choose your house capacity"
					{...register("service", {
						required: "Please select your service",
					})}
				>
					<option value="">Choose Services</option>
					{[
						"Compassionate Deceased Body Transportation",
						"Courier & Cargo",
						"Trucking",
						"Scrap Management",
						"Warehousing",
						"Liquidation",
						"Relocations",
					]?.map((item) => {
						return (
							<option key={item} value={item}>
								{item}
							</option>
						);
					})}
				</select>
				{errors.service && (
					<p role="alert" className="text-[#ef4444] leading-none mt-1">
						{errors.service?.message}
					</p>
				)}
			</fieldset> */}
		</div>
	);
};

export default ModalForm;
