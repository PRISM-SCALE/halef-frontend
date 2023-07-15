import PropTypes from "prop-types";

const CalculatorLayout = ({children}) => {
	return (
		<div className="w-[30%] bg-slate-50 flex flex-col justify-between border border-slate-200 border-solid p-6">
      
			{children}
		</div>
	);
};

CalculatorLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default CalculatorLayout;
