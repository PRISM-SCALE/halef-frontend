import PropTypes from "prop-types";
import {Box, Typography} from "@mui/material";

const CalculatorResultItem = ({title, value, unit}) => {
	return (
		<Box className="p-2">
			<Typography variant="subtitle" className="uppercase">
				{title}
			</Typography>
			<p className="text-4xl">
				{unit}
				{value}/-
			</p>
		</Box>
	);
};

CalculatorResultItem.propTypes = {
	title: PropTypes.string.isRequired,
	unit: PropTypes.string.isRequired,
	value: PropTypes.any.isRequired,
};

export default CalculatorResultItem;
