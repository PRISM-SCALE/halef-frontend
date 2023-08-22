import {useEffect, useState} from "react";
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

// * INITIAL FORM VALUES

// -----------------------------------------------------------------------------

const INITIAL_VALUES = {
	name: "",
	email: "",
	phone: "",
	// service: "",
};

const UserDetails = ({open, onClose, serviceData, calculatorCallback}) => {
	const {mediumScreenAndUp, smallScreenAndUp} = useResponsive();

	// eslint-disable-next-line no-unused-vars
	const [values, setValues] = useLocalStorage("userData", null);

	const [userData, setUserData] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [responseData, setResponseData] = useState();

	const USER_DATA = localStorage.getItem("userData");

	useEffect(() => {
		if (!USER_DATA) {
			setValues(responseData);
			console.log("USER_DATA", responseData);
		}
	}, [USER_DATA, responseData, setValues]);

	const methods = useForm({
		defaultValues: !values?.user?.isPhoneVerified ? {code: ""} : {...INITIAL_VALUES},
	});

	const {handleSubmit, reset} = methods;

	const onSubmit = async (data) => {
		console.log("onSubmit data", data);

		if (!USER_DATA) {
			console.log("CALLBACK", await calculatorCallback);
			console.log("DATA STORED IN LOCAL STORAGE", values);
			const POST_DATA = {
				name: data.name,
				email: data.email,
				phone: Number(data.phone),
				// service: serviceId,
			};

			const response = await createUser(POST_DATA);
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
		console.log("onSubmit userData Entry", userData);
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
						: Boolean(USER_DATA) && !values?.user?.isPhoneVerified
						? "Enter OTP to verify"
						: "Cost Estimation"}
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
	calculatorCallback: PropTypes.object,
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
	calculatorCallback: PropTypes.object,
};

export default Modal;
