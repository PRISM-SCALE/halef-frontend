import PropTypes from "prop-types";

// * HOOKS
import useLocalStorage from "../hooks/useLocalStorage";

// * COMPONENTS
import ResultView from "./ResultView";

const ResultWrapper = ({children, serviceData}) => {
	// eslint-disable-next-line no-unused-vars
	const [values, setValues] = useLocalStorage("userData");

	const USER_DATA = localStorage.getItem("userData");

	console.log(values);

	return (
		<div className={`w-full justify-between gap-6 flex`}>
			<div className="lg:w-[70%] w-full">{children}</div>

			<div className="hidden lg:flex flex-col flex-1">
				{Boolean(USER_DATA) && Boolean(serviceData) && values?.user?.isPhoneVerified ? (
					<div className={`flex justify-end`}>
						<ResultView serviceData={serviceData} />
					</div>
				) : (
					<div className="text-center border bg-slate-50 border-slate-200 border-solid  p-4 flex items-center justify-center flex-grow">
						<h1>Please enter the details to get calculated results</h1>
					</div>
				)}
			</div>
		</div>
	);
};

ResultWrapper.propTypes = {
	children: PropTypes.node.isRequired,
	serviceData: PropTypes.object,
};

export default ResultWrapper;
