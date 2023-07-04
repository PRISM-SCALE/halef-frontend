import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";

const Trucking = () => {
	const header_name = <strong className="text-[#DD3333]">Trucking</strong>;

	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />
		</ServiceWrapper>
	);
};

export default Trucking;
