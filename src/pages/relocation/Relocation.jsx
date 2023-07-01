import Header from "../../components/Header";

const Relocation = () => {
	const header_name = (
		<>
			Relocation - <strong className="text-[#DD3333]">Packers and Movers</strong>
		</>
	);
	return (
		<div className="py-8">
			<Header caption="cost estimation for" title={header_name} />
		</div>
	);
};

export default Relocation;
