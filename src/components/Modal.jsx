import PropTypes from "prop-types";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {FormProvider, useForm} from "react-hook-form";

// * HOOKS
import {useResponsive} from "../hooks/useResponsive";

// * API
import {createUser, verifyOtp} from "../utils/api";

// * COMPONENTS
import ModalForm from "./forms/ModalForm";
import FormWrapper from "./forms/FormWrapper";
import useLocalStorage from "../hooks/useLocalStorage";
import OTPForm from "./forms/OTPForm";
import ResultView from "./ResultView";
import {Icon} from "@iconify-icon/react";
import {useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alert from "./Alert";

// * INITIAL FORM VALUES

// -----------------------------------------------------------------------------

const INITIAL_VALUES = {
	name: "",
	email: "",
	phone: "",
};

const UserDetails = ({open, onClose, serviceData, calculatorCallback}) => {
	const {mediumScreenAndUp, smallScreenAndUp} = useResponsive();
	const {login} = useAuth();

	const location = useLocation();
	const serviceId = location.search.replace(/^\?id=/, "");

	const [values, setValueToLocalStorage] = useLocalStorage("userData", null);

	const USER_DATA = Boolean(values);

	const methods = useForm({
		defaultValues: !values?.user?.isPhoneVerified ? {code: ""} : {...INITIAL_VALUES},
	});

	const {handleSubmit, reset} = methods;

	const onSubmit = async (data) => {
		if (!USER_DATA) {
			login();
			const POST_DATA = {
				name: data.name,
				email: data.email,
				phone: Number(data.phone),
				service: serviceId,
			};

			const response = await createUser(POST_DATA);
			setValueToLocalStorage(response);

			await calculatorCallback(response);

			reset();
		}

		if (USER_DATA && !values?.user?.isPhoneVerified) {
			login();

			console.log("USER NOT VERIFIED");

			const POST_DATA = {
				phone: Number(values?.user?.phone),
				code: data?.code,
			};

			const response = await verifyOtp(POST_DATA);

			setValueToLocalStorage(response);

			await calculatorCallback(response);

			reset();
		}
	};

	return (
		<div className={`${!mediumScreenAndUp ? "block" : "hidden"} relative`}>
			<Dialog
				fullWidth
				fullScreen={!smallScreenAndUp}
				maxWidth="sm"
				open={open}
				onClose={onClose}
				PaperProps={{
					sx: {
						borderRadius: "15px",
						position: "relative",
					},
				}}
			>
				<Icon
					icon="heroicons-solid:x"
					width={24}
					height={24}
					className="absolute right-4 top-4 cursor-pointer"
					onClick={onClose}
				/>
				<DialogTitle sx={{fontWeight: 500}}>
					{!USER_DATA
						? "Fill the below form to get your calculated results"
						: USER_DATA && !values?.user?.isPhoneVerified
						? "Enter OTP to verify"
						: "Cost Estimation"}
				</DialogTitle>

				<FormProvider {...methods}>
					<FormWrapper onSubmit={handleSubmit(onSubmit)}>
						<DialogContent sx={{padding: 0}}>
							{!USER_DATA ? (
								<ModalForm />
							) : USER_DATA && !values?.user?.isPhoneVerified ? (
								<>
									<div className="max-w-xl mx-auto">
										<Alert
											bgColor="bg-blue-50"
											textColor="text-blue-700"
											icon="charm:info"
											message={`No OTP Received? Try clicking resend link to get a new otp`}
										/>
									</div>
									<OTPForm
										phone={Number(values?.user?.phone)}
										USER_DATA={USER_DATA}
										isPhoneVerified={values?.user?.isPhoneVerified}
									/>
								</>
							) : (
								<ResultView serviceData={serviceData} />
							)}
						</DialogContent>

						{USER_DATA && values?.user?.isPhoneVerified ? null : (
							<DialogActions sx={{py: 2}}>
								<Button onClick={onClose} color="error">
									Cancel
								</Button>
								<Button type="submit" color="success">
									Submit
								</Button>
							</DialogActions>
						)}
					</FormWrapper>
				</FormProvider>
			</Dialog>
		</div>
	);
};

UserDetails.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	serviceData: PropTypes.object,
	calculatorCallback: PropTypes.func,
};

// -----------------------------------------------------------------------------

const Modal = ({open, onClose, serviceData, calculatorCallback}) => {
	const {mediumScreenAndUp} = useResponsive();

	return (
		<div className={`${!mediumScreenAndUp ? "block" : "hidden"}`}>
			<UserDetails
				open={open}
				onClose={onClose}
				serviceData={serviceData}
				calculatorCallback={calculatorCallback}
			/>
		</div>
	);
};

Modal.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	serviceData: PropTypes.object,
	calculatorCallback: PropTypes.func,
};

export default Modal;
