const HeaderLayout = () => {
	return (
		<div className="h-[45vh] bg-[url('https://halefinternational.com/wp-content/uploads/2023/07/stock-photo-low-angle-view-of-two-young-delivery-man-carrying-cardboard-box-in-front-of-truck-1486328387-transformed-transformed-copy-scaled-copy-1.webp')] bg-no-repeat bg-cover bg-right-top flex justify-center">
			<div className="max-w-[540px] md:max-w-[720px] lg:max-w-[1300px] px-4 w-full mx-auto flex flex-col justify-center">
				<div className="space-x-4 text-right space-y-2">
					<a
						href="https://halefinternational.com"
						className="text-[#DD3333] hover:text-white transition-colors delay-300 ease-in-out text-lg"
					>
						Home
					</a>
					<span className="text-[#DD3333]">/</span>
					<span className="text-[#DD3333] text-lg">Cost estimator</span>
				</div>
				<div className="text-right">
					<p className="md:text-7xl text-xl font-medium">
						Cost <span className="text-[#DD3333]">Estimator</span>
					</p>
				</div>
			</div>
		</div>
	);
};

HeaderLayout.propTypes = {};

export default HeaderLayout;
