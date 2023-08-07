import PropTypes from "prop-types";

import CalculatorResultItem from "./CalculatorResultItem";
import CalculatorResultLayout from "./CalculatorResultLayout";

const ResultView = ({serviceData}) => {
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

	return null;
};

ResultView.propTypes = {
	serviceData: PropTypes.object,
};

export default ResultView;
