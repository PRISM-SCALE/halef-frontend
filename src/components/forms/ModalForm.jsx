import {useFormContext} from "react-hook-form";

const ModalForm = () => {
	const {
		register,
		formState: {errors},
	} = useFormContext();

	return (
		<div className="w-full flex flex-col gap-4">
			<fieldset>
				<label htmlFor="name" className="text-[#f8bf02]">
					Name
				</label>
				<input
					name="name"
					className="input-fields appearance-none focus:outline-[#dd3333]"
					placeholder="Enter Your First Name"
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
					className="input-fields appearance-none focus:outline-[#dd3333]"
					placeholder="Enter Your First Name"
					{...register("email", {
						required: "Please enter your first name",
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
					className="input-fields appearance-none focus:outline-[#dd3333]"
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
		</div>
	);
};

export default ModalForm;
