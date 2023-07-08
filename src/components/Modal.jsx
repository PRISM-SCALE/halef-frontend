import PropTypes from "prop-types";

// * COMPONENTS
import ModalForm from "./forms/ModalForm";

const Modal = ({open, title}) => {
	return (
		<>
			{open ? (
				<div className="p-4 sm:w-full sm:h-full overflow-hidden">
					{/* Title */}
					<div className="mb-6">
						<h3 className="">{title}</h3>
					</div>

					<ModalForm />
				</div>
			) : null}
		</>
	);
};

Modal.propTypes = {
	open: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
};

export default Modal;
