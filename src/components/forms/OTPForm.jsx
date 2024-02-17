import {useEffect} from "react";
import PropTypes from "prop-types";
import {useLocation} from "react-router-dom";
import {useFormContext} from "react-hook-form";
import {resendPaymentOTP, resendUserOTP} from "../../utils/api";

const OTPForm = ({phone, isPhoneVerified, USER_DATA}) => {
	const location = useLocation();

	useEffect(() => {
		const resendOtp = async () => {
			if (USER_DATA && !isPhoneVerified) {
				return await resendUserOTP(phone);
			}
		};

		resendOtp();
	}, [USER_DATA, isPhoneVerified, phone]);

	console.log(location.pathname);

	const {
		register,
		formState: {errors},
	} = useFormContext();

	const handleResendOTP = async (e) => {
		e.preventDefault();
		if (location.pathname === "pay-online") {
			await resendPaymentOTP(phone);

			return;
		} else {
			await resendUserOTP(phone);
		}
	};

	return (
		<div className={"p-6"}>
			<fieldset>
				<label htmlFor="code" className="text-[#f8bf02]">
					OTP
				</label>
				<input
					name="code"
					type="number"
					className="input-fields appearance-none "
					placeholder="Enter OTP"
					inputMode="numeric"
					{...register("code", {
						required: "Please enter OTP",
						pattern: {
							value: "^[0-9]{6}$", // Ensure the input is 6 digits (adjust the number if needed)
							message: "OTP must be a 6-digit number",
						},
					})}
				/>
				{errors.code && (
					<p role="alert" className="text-[#ef4444] leading-none mt-2">
						{errors.code?.message}
					</p>
				)}
			</fieldset>
			<div className="mt-2 flex justify-end w-full">
				<button
					className="block cursor-pointer text-orange-400 no-underline"
					onClick={handleResendOTP}
				>
					RESEND OTP
				</button>
			</div>
		</div>
	);
};

OTPForm.propTypes = {
	phone: PropTypes.number.isRequired,
	isPhoneVerified: PropTypes.bool,
	USER_DATA: PropTypes.bool,
};

export default OTPForm;
