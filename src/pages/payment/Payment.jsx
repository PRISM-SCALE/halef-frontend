import {FormProvider, useForm} from "react-hook-form";

import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import {useMemo} from "react";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";

const Payment = () => {
	const defaultValues = useMemo(
		() => ({
			name: "",
			email: "",
			mobile: "",
			jobNo: "",
			amount: "",
			tandc: false,
		}),
		[]
	);

	const methods = useForm({
		defaultValues,
	});

	const {
		register,
		formState: {errors},
		handleSubmit,
		watch,
	} = methods;

	const values = watch();

	const onSubmit = () => {};

	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={"PAY ONLINE"} />
			<FormProvider {...methods}>
				<FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<fieldset>
						<label htmlFor="name" className="text-[#f8bf02]">
							Name
						</label>
						<input
							name="name"
							type="text"
							className="input-fields"
							placeholder="Your name"
							{...register("name", {required: "Please enter your name"})}
							aria-invalid={errors.name ? "true" : "false"}
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
							className="input-fields"
							placeholder="youremail@domain.com"
							{...register("email", {
								required: "Please enter your email",
								validate: {
									maxLength: (v) => v.length <= 50 || "The email should have at most 50 characters",
									matchPattern: (v) =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
										"Email address must be a valid address",
								},
							})}
							aria-invalid={errors.email ? "true" : "false"}
						/>
						{errors.email && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.email?.message}
							</p>
						)}
					</fieldset>

					<fieldset>
						<label htmlFor="jobNo" className="text-[#f8bf02]">
							Shipment Id
						</label>
						<input
							name="jobNo"
							type="text"
							className="input-fields"
							placeholder="youremail@domain.com"
							{...register("jobNo", {required: "Please enter your Shipment number"})}
							aria-invalid={errors.jobNo ? "true" : "false"}
						/>
						{errors.jobNo && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.jobNo?.message}
							</p>
						)}
					</fieldset>

					<fieldset>
						<label htmlFor="phone" className="text-[#f8bf02]">
							Mobile Number
						</label>
						<input
							name="phone"
							type="number"
							className="input-fields"
							placeholder="9778240323"
							{...register("phone", {
								required: "Please enter your Phone number",
								maxLength: {
									value: 10,
									message: "Mobile number has a limit of 10, please enter a valid number",
								},
							})}
							aria-invalid={errors.phone ? "true" : "false"}
						/>
						{errors.phone && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.phone?.message}
							</p>
						)}
					</fieldset>

					<fieldset>
						<label htmlFor="amount" className="text-[#f8bf02]">
							Amount
						</label>
						<input
							name="amount"
							type="number"
							className="input-fields appearance-none"
							placeholder="Example: ₹100/-"
							{...register("phone", {required: "Please enter your Amount"})}
							aria-invalid={errors.phone ? "true" : "false"}
						/>
						{errors.phone && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.phone?.message}
							</p>
						)}
					</fieldset>

					<fieldset className="flex items-center gap-2">
						<input
							name="tandc"
							type="checkbox"
							id="relocation-insurance"
							{...register("insurance", {required: "Please check the terms and conditions"})}
							checked={values.tandc}
						/>
						<label htmlFor="tandc" className="font-semibold">
							I accept the Terms and Conditions
						</label>

						{errors.phone && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.phone?.message}
							</p>
						)}
					</fieldset>

					<p>
						If for any reason, including any action or request be made by me or on my behalf, this
						charge or any part of this charge is refused, contested, declined or otherwise not paid,
						I am and will be personally liable for the entire charge, including interest at the rate
						of 12% per annum until paid, including court costs or attorney fees.
					</p>

					<Button buttonText="submit" />
				</FormWrapper>
			</FormProvider>
		</ServiceWrapper>
	);
};

export default Payment;
