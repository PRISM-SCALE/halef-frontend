import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";

const AirAmbulance = () => {
	const header_name = (
		<>
			Air <strong className="text-[#DD3333]">Ambulance</strong>
		</>
	);
	return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />
		</ServiceWrapper>
	);
};

export default AirAmbulance;
