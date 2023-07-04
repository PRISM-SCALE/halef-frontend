import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";

const Cargo = () => {
	const header_name = (
		<>
			Courier and - <strong className="text-[#DD3333]">Cargo</strong>
		</>
	);
	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />
			{/* FORM */}
		</ServiceWrapper>
	);
};

export default Cargo;
