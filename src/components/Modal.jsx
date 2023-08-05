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
import CalculatorResultLayout from "./CalculatorResultLayout";
import CalculatorResultItem from "./CalculatorResultItem";

// * INITIAL FORM VALUES

// -----------------------------------------------------------------------------

const ResultModal = ({open, onClose, serviceData}) => {
	const {mediumScreenAndUp} = useResponsive();
	if (serviceData) {
		const {name, image, costData} = serviceData;

		console.log(open);

		console.log(serviceData);

		return (
			<Dialog fullScreen={!mediumScreenAndUp} open={open} onClose={onClose}>
				<DialogContent sx={{padding: 0}}>
					{serviceData ? (
						<CalculatorResultLayout imageName={name} imageUrl={image}>
							<div className="px-4">
								{costData?.map(({name, cost, unit}, index) => {
									return <CalculatorResultItem key={index} title={name} value={cost} unit={unit} />;
								})}
							</div>
						</CalculatorResultLayout>
					) : (
						<div className="text-center border bg-slate-50 border-slate-200 border-solid rounded-sm p-4 uppercase flex items-center justify-center">
							<h1>Please enter the details to get calculated results</h1>
						</div>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="error">
						CLOSE
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	return null;
};

ResultModal.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	serviceData: PropTypes.object,
};

// -----------------------------------------------------------------------------

const UserDetails = ({open, onClose, serviceData}) => {
	const INITIAL_VALUES = {
		name: "",
		email: "",
		phone: "",
	};
	// eslint-disable-next-line no-unused-vars
	const [values, setValues] = useLocalStorage("userData");

	const [userData, setUserData] = useState(null);
	const [responseData, setResponseData] = useState();

	useEffect(() => {
		if (userData) {
			setValues(responseData);
		}
		console.log("USER_DATA", responseData);
	}, [userData, setValues, responseData]);

	const methods = useForm({
		defaultValues: !userData?.isPhoneVerified ? {code: ""} : {...INITIAL_VALUES},
	});

	const {handleSubmit, reset} = methods;

	const onSubmit = async (data) => {
		console.log("onSubmit userData Entry", userData);
		if (!userData) {
			const response = await createUser(data);
			setResponseData(response);
			setUserData(response?.user);

			console.log("onSubmit userData", userData);
		}

		if (userData && !userData?.isPhoneVerified) {
			const response = await verifyOtp(data);
			setResponseData(response);
			setUserData(response?.user);
		}

		reset();
	};

	return (
		<Dialog open={open}>
			<DialogTitle className="font-semibold">
				{!userData ? "Fill the below form to get your calculated results" : "Enter OTP to verify"}
			</DialogTitle>
			<FormProvider {...methods}>
				<FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						{!userData ? (
							<ModalForm />
						) : userData && !userData?.isPhoneVerified ? (
							<OTPForm phone={Number(values?.user?.phone)} />
						) : (
							<ResultModal open={open} onClose={onClose} serviceData={serviceData} />
						)}
					</DialogContent>

					<DialogActions sx={{py: 2}}>
						<Button onClick={onClose} color="error">
							Cancel
						</Button>
						<Button type="submit" color="success">
							Submit
						</Button>
					</DialogActions>
				</FormWrapper>
			</FormProvider>
		</Dialog>
	);
};

UserDetails.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	serviceData: PropTypes.object,
};

// -----------------------------------------------------------------------------

const Modal = ({open, onClose, serviceData}) => {
	return (
		<>
			<UserDetails open={open} onClose={onClose} serviceData={serviceData} />
		</>
	);
};

Modal.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	serviceData: PropTypes.object,
};
export default Modal;
