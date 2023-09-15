import PropTypes from "prop-types";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useResponsive} from "../hooks/useResponsive";
import {Icon} from "@iconify-icon/react";
import {FormProvider, useForm} from "react-hook-form";
import FormWrapper from "./forms/FormWrapper";
import {useMemo} from "react";
import OTPForm from "./forms/OTPForm";
import {verifyPaymentOtp} from "../utils/api";

const PaymentModal = ({open, onClose, phone}) => {
	const {mediumScreenAndUp, smallScreenAndUp} = useResponsive();

	const defaultValues = useMemo(
		() => ({
			code: "",
		}),
		[]
	);

	const methods = useForm({
		defaultValues,
	});

	const {handleSubmit, watch, reset} = methods;

	const values = watch();

	const onSubmit = async () => {
		const POST_DATA = {
			code: values.code,
			phone,
		};

		await verifyPaymentOtp(POST_DATA);

		onClose();
		reset();
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
				<DialogTitle sx={{fontWeight: 500}}>Please provide OTP for verification</DialogTitle>

				<FormProvider {...methods}>
					<FormWrapper onSubmit={handleSubmit(onSubmit)}>
						<DialogContent sx={{padding: 0}}>
							<OTPForm phone={Number(values?.phone)} />
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
		</div>
	);
};

PaymentModal.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	phone: PropTypes.number.isRequired,
};

export default PaymentModal;
