import PropTypes from "prop-types";
import {forwardRef} from "react";
// form
import {useFormContext, Controller} from "react-hook-form";
// @mui
import {TextField} from "@mui/material";

// ----------------------------------------------------------------------

const RHFSelect = forwardRef(({name, children, ...other}, ref) => {
	const {control} = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({field}) => (
				<TextField
					{...field}
					select
					fullWidth
					// SelectProps={{ native: true }}
					// error={!!error}
					// helperText={error?.message}
					{...other}
					ref={ref} // Forwarding the ref to the underlying TextField component
				>
					{children}
				</TextField>
			)}
		/>
	);
});

RHFSelect.displayName = "RHFSelect";

RHFSelect.propTypes = {
	children: PropTypes.node,
	name: PropTypes.string,
};

export default RHFSelect;
