import {FormProvider, useForm} from "react-hook-form";

import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";
import {useMemo} from "react";
import FormWrapper from "../../components/forms/FormWrapper";
import Button from "../../components/forms/Button";
import {createPayment} from "../../utils/api";
import useToggle from "../../hooks/useToggle";
import PaymentModal from "../../components/PaymentModal";

const Payment = () => {
	const {toggle: open, onOpen, onClose} = useToggle();
	// const [responseData, setResponseData] = useState();
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
		mode: "all",
	});

	const {
		register,
		formState: {errors, isValid, isSubmitting},
		handleSubmit,
		trigger,
		watch,
		setError,
		// reset,
	} = methods;

	const values = watch();

	const onSubmit = async () => {
		try {
			if (isValid) {
				setError("jobNo", {message: ""});
				const POST_DATA = {
					name: values.name,
					email: values.email,
					phone: values.mobile,
					paymentId: values.jobNo,
					amount: values.amount,
					isTermsAndConditionsVerified: values.tandc,
				};

				const response = await createPayment(POST_DATA);
				// setResponseData(response);
				console.log(response);

				if (response?.paymentData?._id) {
					const saveObjectAsString = JSON.stringify(response?.paymentData);
					window.localStorage.setItem("PID_CUSTOMER", saveObjectAsString);
				}

				if (!response.isError) {
					onOpen();
				} else {
					setError("jobNo", {message: response?.error});
				}
			}
			// else {
			// 	throw new Error("Uh-oh, Looks like Your form is still invalid!!");
			// }
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ServiceWrapper>
			<Header caption="Quote Calculator - Halef International" title={"Payment Portal"} />
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
							onInput={() => {
								if (values.name) trigger("name");
							}}
							{...register("name", {
								required: "Please enter your name",
								minLength: {
									value: 3,
									message: "The Name should have 3 or more letters",
								},
							})}
							aria-invalid={errors.name ? "true" : "false"}
							autoComplete="new-password"
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
								maxLength: {
									value: 50,
									message: "The email should have at most 50 characters",
								},
								pattern: {
									value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
									message: "Email address must be valid",
								},
							})}
							aria-invalid={errors.email ? "true" : "false"}
							onInput={() => {
								if (values.email) trigger("email");
							}}
							autoComplete="new-password"
						/>
						{errors.email && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.email?.message}
							</p>
						)}
					</fieldset>

					<fieldset>
						<label htmlFor="jobNo" className="text-[#f8bf02]">
							Payment Id
						</label>
						<input
							name="jobNo"
							type="text"
							className="input-fields"
							placeholder="ID: XXXXXX"
							{...register("jobNo", {required: "Please enter your Shipment number"})}
							aria-invalid={errors.jobNo ? "true" : "false"}
							onInput={() => {
								if (values.jobNo) trigger("jobNo");
							}}
							autoComplete="new-password"
						/>
						{errors.jobNo && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.jobNo?.message}
							</p>
						)}
					</fieldset>

					<fieldset>
						<label htmlFor="mobile" className="text-[#f8bf02]">
							Mobile Number
						</label>
						<input
							name="mobile"
							type="number"
							className="input-fields"
							placeholder="EX: 9778240323"
							{...register("mobile", {
								required: "Please enter your mobile number",
								maxLength: {
									value: 10,
									message: "Mobile number has a limit of 10, please enter a valid number",
								},
								// validate: (value) => {
								// 	return /^[0-9]{10}$/.test(value) || "Mobile number should be exactly 10 digits";
								// },
							})}
							aria-invalid={errors.mobile ? "true" : "false"}
							onInput={() => {
								if (values.mobile) trigger("mobile");
							}}
							autoComplete="new-password"
						/>
						{errors.mobile && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.mobile?.message}
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
							{...register("amount", {required: "Please enter your Amount"})}
							aria-invalid={errors.amount ? "true" : "false"}
							onInput={() => {
								if (values.amount) trigger("amount");
							}}
							autoComplete="new-password"
						/>
						{errors.amount && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1">
								{errors.amount?.message}
							</p>
						)}
					</fieldset>

					<fieldset className="flex items-start gap-2 flex-col">
						<div className="flex gap-2">
							<input
								name="tandc"
								type="checkbox"
								{...register("tandc", {required: "Please check the terms and conditions"})}
								checked={values.tandc}
							/>
							<label htmlFor="tandc" className="font-semibold">
								I accept the Terms and Conditions
							</label>
						</div>

						{errors.tandc && (
							<p role="alert" className="text-[#ef4444] leading-none mt-1 block w-full">
								{errors.tandc?.message}
							</p>
						)}
					</fieldset>

					<p>
						If for any reason, including any action or request be made by me or on my behalf, this
						charge or any part of this charge is refused, contested, declined or otherwise not paid,
						I am and will be personally liable for the entire charge, including interest at the rate
						of 12% per annum until paid, including court costs or attorney fees.
					</p>

					<Button buttonText="pay now" disabled={isSubmitting} />
				</FormWrapper>
			</FormProvider>

			<PaymentModal
				open={open}
				onClose={() => {
					onClose();
					window.location.reload();
				}}
				phone={Number(values.mobile)}
			/>
		</ServiceWrapper>
	);
};

export default Payment;
