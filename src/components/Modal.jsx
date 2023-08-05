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

const UserDetails = ({open, onClose}) => {
	const INITIAL_VALUES = {
		name: "",
		email: "",
		phone: "",
	};
	// eslint-disable-next-line no-unused-vars
	const [values, setValues] = useLocalStorage("userData");

	const [userData, setUserData] = useState(null);
	const [responseData, setResponseData] = useState();

	const isUserDataAvailable = Boolean(userData?.email) && Boolean(userData?.phone);

	useEffect(() => {
		if (userData) {
			setValues(responseData);
		}
	}, [userData, setValues, responseData]);

	const methods = useForm({
		defaultValues: isUserDataAvailable ? {code: ""} : {...INITIAL_VALUES},
	});

	const {handleSubmit, reset} = methods;

	const onSubmit = async (data) => {
		if (!userData) {
			const response = createUser(data);
			setResponseData(response);
			setUserData(response?.user);
		}

		// if()

		reset();
	};

	console.log("USER_DATA", responseData);

	return (
		<Dialog open={open}>
			<DialogTitle className="font-semibold">
				{!userData ? "Fill the below form to get your calculated results" : "Enter OTP to verify"}
			</DialogTitle>
			<FormProvider {...methods}>
				<FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						{!userData ? <ModalForm /> : <OTPForm phone={Number(values.phone)} />}
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
};

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

const Modal = ({open, onClose, isVerified, serviceData}) => {
	return (
		<>
			{isVerified ? (
				<ResultModal open={open} onClose={onClose} serviceData={serviceData} />
			) : (
				<UserDetails open={open} onClose={onClose} />
			)}
		</>
	);
};

Modal.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	isVerified: PropTypes.bool.isRequired,
	serviceData: PropTypes.object,
};
export default Modal;
