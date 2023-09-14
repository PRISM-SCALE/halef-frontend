import PropTypes from "prop-types";

const HeaderLayout = ({
	title = (
		<>
			Cost <span className="text-[#DD3333]">Estimator</span>
		</>
	),
	breadcrumbLink = "Cost estimator",
}) => {
	return (
		<div className="h-[40vh] md:h-[48vh] bg-no-repeat bg-cover bg-center md:bg-right-top flex justify-center bg-[url('https://halefinternational.com/wp-content/uploads/2023/07/stock-photo-low-angle-view-of-two-young-delivery-man-carrying-cardboard-box-in-front-of-truck-1486328387-transformed-transformed-copy-scaled-copy-1.webp')]">
			<div className="max-w-[540px] md:max-w-[720px] lg:max-w-[1300px] px-4 w-full mx-auto flex flex-col justify-center">
				<div className="space-x-4 text-right mb-2">
					<a
						href="https://halefinternational.com"
						className="text-[#DD3333] hover:text-white transition-colors delay-300 ease-in-out text-lg leading-5"
					>
						Home
					</a>
					<span className="text-[#DD3333]">/</span>
					<span className="text-[#DD3333] text-lg leading-5">
						{/* Cost estimator */}
						{breadcrumbLink}
					</span>
				</div>
				<div className="text-right">
					<p className="md:text-7xl text-5xl font-medium">
						{title}
						{/* Cost <span className="text-[#DD3333]">Estimator</span> */}
					</p>
				</div>
			</div>
		</div>
	);
};

HeaderLayout.propTypes = {
	title: PropTypes.node,
	breadcrumbLink: PropTypes.string,
};

export default HeaderLayout;
