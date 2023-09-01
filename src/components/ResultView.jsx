import PropTypes from "prop-types";

import CalculatorResultItem from "./CalculatorResultItem";
import CalculatorResultLayout from "./CalculatorResultLayout";
import {CircularProgress} from "@mui/material";

const ResultView = ({serviceData}) => {
	console.log("SERVICE DATA IN RESULT VIEW", serviceData);

	if (!serviceData) {
		return <CircularProgress color="#DD3333" />;
	}

	if (serviceData) {
		const {name, image, costData} = serviceData;

		return (
			<>
				{serviceData && (
					<CalculatorResultLayout imageName={name} imageUrl={image}>
						<div className="px-4">
							{costData?.map(({name, cost, unit}, index) => {
								return <CalculatorResultItem key={index} title={name} value={cost} unit={unit} />;
							})}
						</div>
					</CalculatorResultLayout>
				)}
			</>
		);
	}

	return (
		<div className="flex items-center justify-center p-6 mx-4 mb-4 border-dashed border-slate-300 border-2 mt-8">
			<h2 className="text-xl">Uh-oh! There&apos;s nothing to show here.</h2>
		</div>
	);
};

ResultView.propTypes = {
	serviceData: PropTypes.object,
};

export default ResultView;
