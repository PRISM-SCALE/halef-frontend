import PropTypes from "prop-types";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {FormProvider, useForm} from "react-hook-form";

// * COMPONENTS
import ModalForm from "./forms/ModalForm";
import FormWrapper from "./forms/FormWrapper";
import useLocalStorage from "../hooks/useLocalStorage";

// * INITIAL FORM VALUES
const INITIAL_VALUES = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
};

const Modal = ({open, onClose}) => {
	// eslint-disable-next-line no-unused-vars
	const [values, setValues] = useLocalStorage("userData", {...INITIAL_VALUES});

	// console.log(values);

	const methods = useForm({
		defaultValues: {...INITIAL_VALUES},
	});

	const {handleSubmit} = methods;

	const onSubmit = (data) => {
		console.log("MODAL FORM", data);
		setValues(data);
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle className="font-semibold">
				Fill the below form to get your calculated results
			</DialogTitle>
			<FormProvider {...methods}>
				<FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<ModalForm />
					</DialogContent>
					<DialogActions sx={{py: 2}}>
						<Button onClick={onClose} color="error">
							Cancel
						</Button>
						<Button type="submit">Save</Button>
					</DialogActions>
				</FormWrapper>
			</FormProvider>
		</Dialog>
	);
};

Modal.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
};

export default Modal;
