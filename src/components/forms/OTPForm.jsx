import {Link} from "@mui/material";
import {useFormContext} from "react-hook-form";

const OTPForm = () => {
	const {
		register,
		formState: {errors},
	} = useFormContext();

	return (
		<div>
			<fieldset>
				<label htmlFor="otp" className="text-[#f8bf02]">
					OTP
				</label>
				<input
					name="otp"
					className="input-fields appearance-none focus:outline-[#dd3333]"
					placeholder="Enter OTP"
					{...register("otp", {
						required: "Please enter OTP",
					})}
				/>
				{errors.otp && (
					<p role="alert" className="text-[#ef4444] leading-none mt-2">
						{errors.otp?.message}
					</p>
				)}
			</fieldset>
			<div className="mt-2 flex justify-end w-full">
				<Link className="block cursor-pointer mt-3 text-orange-400 no-underline">RESEND OTP</Link>
			</div>
		</div>
	);
};

export default OTPForm;
