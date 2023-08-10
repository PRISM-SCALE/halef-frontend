import PropTypes from "prop-types";
import {Typography} from "@mui/material";

const CalculatorResultItem = ({title, value, unit}) => {
	return (
		<div
			className={`p-4 my-4 rounded-xl ${
				title === "TOTAL" ? "bg-green-100 text-green-900" : "bg-zinc-100 text-zinc-950"
			}`}
		>
			<Typography variant="subtitle" className="uppercase">
				{title}
			</Typography>
			<p className="text-4xl">
				{unit === "kg" ? null : unit} {value} {unit === "₹" ? null : unit}
			</p>
		</div>
	);
};

CalculatorResultItem.propTypes = {
	title: PropTypes.string.isRequired,
	unit: PropTypes.string.isRequired,
	value: PropTypes.any.isRequired,
};

export default CalculatorResultItem;
