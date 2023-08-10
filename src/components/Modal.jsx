import {useState} from "react";
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

// * INITIAL FORM VALUES

// -----------------------------------------------------------------------------

const INITIAL_VALUES = {
	name: "",
	email: "",
	phone: "",
	service: "",
};

const UserDetails = ({open, onClose, serviceData}) => {
	const {largeScreenAndUp} = useResponsive();
	// eslint-disable-next-line no-unused-vars
	const [values, setValues] = useLocalStorage("userData", null);

	const [userData, setUserData] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [responseData, setResponseData] = useState();

	const USER_DATA = localStorage.getItem("userData");

	// useEffect(() => {
	// 	if (!userData) {
	// 		setValues(responseData);
	// 	}

	// 	console.log("USER_DATA", responseData);
	// }, [userData, setValues, responseData, USER_DATA?.user?._id, USER_DATA, values]);

	const methods = useForm({
		defaultValues: !values?.user?.isPhoneVerified ? {code: ""} : {...INITIAL_VALUES},
	});

	const {handleSubmit, reset} = methods;

	const onSubmit = async (data) => {
		console.log("onSubmit userData Entry", userData);

		if (!USER_DATA) {
			const response = await createUser(data);
			setResponseData(response);
			setUserData(response?.user);
			setValues(response);

			console.log("onSubmit userData", userData);
			reset();
		}

		if (USER_DATA && !values?.user?.isPhoneVerified) {
			const POST_DATA = {
				phone: Number(values?.user?.phone),
				code: data?.code,
			};

			const response = await verifyOtp(POST_DATA);
			setResponseData(response);
			setUserData(response?.user);
			setValues(response);

			reset();
		}
	};

	return (
		<div className={`${!largeScreenAndUp ? "block" : "hidden"}`}>
			<Dialog fullWidth fullScreen={!largeScreenAndUp} maxWidth="sm" open={open} onClose={onClose}>
				<DialogTitle className="font-semibold">
					{!USER_DATA
						? "Fill the below form to get your calculated results"
						: Boolean(USER_DATA) && !values?.user?.isPhoneVerified
						? "Enter OTP to verify"
						: "Here's Your Calculated Results"}
				</DialogTitle>

				<FormProvider {...methods}>
					<FormWrapper onSubmit={handleSubmit(onSubmit)}>
						<DialogContent sx={{padding: 0}}>
							{!USER_DATA ? (
								<ModalForm />
							) : Boolean(USER_DATA) && !values?.user?.isPhoneVerified ? (
								<OTPForm phone={Number(values?.user?.phone)} />
							) : (
								<ResultView serviceData={serviceData} />
							)}
						</DialogContent>

						{USER_DATA && values?.user?.isPhoneVerified ? (
							<DialogActions sx={{py: 2}}>
								<Button onClick={onClose} color="error">
									Close
								</Button>
							</DialogActions>
						) : (
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
};

// -----------------------------------------------------------------------------

const Modal = ({open, onClose, serviceData}) => {
	const {largeScreenAndUp} = useResponsive();

	return (
		<div className={`${!largeScreenAndUp ? "block" : "hidden"}`}>
			<UserDetails open={open} onClose={onClose} serviceData={serviceData} />
		</div>
	);
};

Modal.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	serviceData: PropTypes.object,
};
export default Modal;
