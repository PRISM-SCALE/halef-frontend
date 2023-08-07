import PropTypes from "prop-types";

// * HOOKS
import {useResponsive} from "../hooks/useResponsive";

// * COMPONENTS
import ResultView from "./ResultView";

const ResultWrapper = ({children, serviceData}) => {
	const {mediumScreenAndUp} = useResponsive();

	return (
		<div className={`w-full justify-between gap-6 ${mediumScreenAndUp ? "flex" : "hidden"}`}>
			<div className="w-[70%]">{children}</div>

			{serviceData ? (
				<div className={`${mediumScreenAndUp ? "flex" : "hidden"} w-[30%] justify-end`}>
					<ResultView serviceData={serviceData} />
				</div>
			) : (
				<div className="text-center border bg-slate-50 border-slate-200 border-solid  p-4 flex items-center justify-center flex-grow">
					<h1>Please enter the details to get calculated results</h1>
				</div>
			)}
		</div>
	);
};

ResultWrapper.propTypes = {
	children: PropTypes.node.isRequired,
	serviceData: PropTypes.object,
};

export default ResultWrapper;
