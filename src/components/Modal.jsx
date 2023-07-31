import PropTypes from "prop-types";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {FormProvider, useForm} from "react-hook-form";

// * COMPONENTS
import ModalForm from "./forms/ModalForm";
import FormWrapper from "./forms/FormWrapper";
import useLocalStorage from "../hooks/useLocalStorage";
import OTPForm from "./forms/OTPForm";
import {useEffect, useState} from "react";
import CalculatorResultLayout from "./CalculatorResultLayout";
import CalculatorResultItem from "./CalculatorResultItem";
import {useResponsive} from "../hooks/useResponsive";

// * INITIAL FORM VALUES
const INITIAL_VALUES = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	otp: "",
};

const UserDetails = ({open, onClose}) => {
	// eslint-disable-next-line no-unused-vars
	const [values, setValues] = useLocalStorage("userData", {...INITIAL_VALUES});

	const [userData, setUserData] = useState();

	const isUserDataAvailable = userData?.email && userData?.phone ? true : false;

	useEffect(() => {
		const getUserFromLocal = () => {
			const USER_DATA = JSON.parse(localStorage.getItem("userData"));
			setUserData(USER_DATA);
		};

		getUserFromLocal();
	}, [values]);

	const methods = useForm({
		defaultValues: {...INITIAL_VALUES},
	});

	const {handleSubmit} = methods;

	const onSubmit = (data) => {
		if (!isUserDataAvailable) {
			setValues(data);
		}
	};

	console.log("USER_DATA", userData);

	console.log("USER_DATA_AVAILABLE", isUserDataAvailable);

	return (
		<Dialog open={open}>
			<DialogTitle className="font-semibold">
				{isUserDataAvailable
					? "Please provide the OTP we have sent you"
					: "Fill the below form to get your calculated results"}
			</DialogTitle>
			<FormProvider {...methods}>
				<FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>{isUserDataAvailable ? <OTPForm /> : <ModalForm />}</DialogContent>

					{isUserDataAvailable ? (
						<DialogActions sx={{py: 2}}>
							<Button type="submit" color="error" onClick={onClose}>
								CLOSE
							</Button>
						</DialogActions>
					) : (
						<DialogActions sx={{py: 2}}>
							<Button onClick={onClose} color="error">
								Cancel
							</Button>
							<Button type="submit" color="success">
								Save
							</Button>
						</DialogActions>
					)}
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
