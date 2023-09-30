import {Box, CircularProgress} from "@mui/material";
import PropTypes from "prop-types";

import CalculatorResultItem from "./CalculatorResultItem";
import CalculatorResultLayout from "./CalculatorResultLayout";

const ResultView = ({serviceData}) => {
	if (!serviceData) {
		return (
			<Box sx={{display: "flex", justifyContent: "center", my: 10}}>
				<CircularProgress size={60} sx={{color: "#DD3333"}} />
			</Box>
		);
	}

	if (serviceData?.isMessage) {
		return <div className="text-center text-4xl py-6">{serviceData?.message}</div>;
	}

	return (
		<>
			{serviceData ? (
				<CalculatorResultLayout imageName={serviceData?.name} imageUrl={serviceData?.image}>
					<div className="px-4">
						{serviceData?.costData?.map(({name, cost, unit}, index) => {
							return <CalculatorResultItem key={index} title={name} value={cost} unit={unit} />;
						})}
					</div>
				</CalculatorResultLayout>
			) : serviceData?.isError ? (
				<div className="flex items-center justify-center p-6 mx-4 mb-4 border-dashed border-slate-300 border-2 mt-8">
					<h2 className="text-xl">{serviceData?.message}</h2>
				</div>
			) : (
				<div className="flex items-center justify-center p-6 mx-4 mb-4 border-dashed border-slate-300 border-2 mt-8">
					<h2 className="text-xl">Uh-oh! There&apos;s nothing to show here.</h2>
				</div>
			)}
		</>
	);
};

ResultView.propTypes = {
	serviceData: PropTypes.object,
};

export default ResultView;
