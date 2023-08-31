import PropTypes from "prop-types";

const CalculatorResultLayout = ({children}) => {
	return (
		<div className="flex flex-col w-full">
			{/* IMAGE */}
			{/* <div className="relative">
				<div
					className="absolute bottom-0 left-0 right-0"
					style={{
						background: "linear-gradient(to top, black, transparent)",
						height: "35%",
					}}
				></div>
				<div
					className={`w-72 h-72 bg-no-repeat bg-cover bg-center bg-blend-screen mx-auto`}
					style={{backgroundImage: `url(${imageUrl})`}}
					alt="truck image"
				> */}
			{/* Truck Name */}
			{/* <div className="absolute bottom-0 left-0 right-0 p-4">
						<p className="text-xl text-white">{imageName}</p>
					</div>
				</div>
			</div> */}

			{/* LOOP DATA */}
			<div>{children}</div>
		</div>
	);
};

CalculatorResultLayout.propTypes = {
	children: PropTypes.node,
	imageUrl: PropTypes.string,
	imageName: PropTypes.string,
};

export default CalculatorResultLayout;
