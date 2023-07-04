import Header from "../../components/Header";
import ServiceWrapper from "../../components/ServiceWrapper";

const Warehouse = () => {
  const header_name = <strong className="text-[#DD3333]">Warehousing</strong>;

  return (
		<ServiceWrapper>
			<Header caption="cost estimation for" title={header_name} />
		</ServiceWrapper>
	);
};

export default Warehouse;
