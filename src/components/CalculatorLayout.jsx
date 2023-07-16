import PropTypes from "prop-types";

const CalculatorResultLayout = ({children}) => {
	return (
		<div className="bg-slate-50 flex flex-col justify-between p-6">
			{/* IMAGE */}
			<div>
				<div>
					<img src="/Container_32ft_SXL.webp" alt="truck image" />
				</div>
			</div>

			{/* LOOP DATA */}
			<div>{children}</div>
		</div>
	);
};

CalculatorResultLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default CalculatorResultLayout;
