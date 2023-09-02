import {useState} from "react";
import PropTypes from "prop-types";
import {useFormContext} from "react-hook-form";

const CustomDropdown = ({name, options}) => {
	const {watch, setValue} = useFormContext();
	const [isOpen, setIsOpen] = useState(false);
	const selectedOption = watch(name);
	const values = watch();

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (optionValue) => {
		console.log(optionValue);
		toggleDropdown();
		setValue(name, optionValue);
	};

	const isDisabled = !values.distance; // Check if values.distance is falsy

	return (
		<div className="relative">
			<label htmlFor="vehicle" className="text-[#f8bf02] mb-4">
				Select vehicle
			</label>
			<div
				type="button"
				className={`input-fields appearance-none w-full ${
					isDisabled ? "opacity-50 cursor-not-allowed" : ""
				}`}
				onClick={toggleDropdown}
			>
				{selectedOption ? (
					<div className="flex items-center space-x-2">
						<span>{selectedOption?.name}</span>
					</div>
				) : (
					"Select an option"
				)}
			</div>

			{isOpen && (
				<div className="absolute mt-2 max-h-80 overflow-y-scroll w-full bg-white border rounded shadow-md z-10">
					{options?.map((option) => (
						<div
							key={option?._id}
							className={`cursor-pointer hover:bg-gray-100 transition duration-300 ${
								isDisabled ? "opacity-50 cursor-not-allowed" : ""
							}`}
							onClick={() => handleOptionClick(option)}
							disabled={isDisabled}
						>
							<div className="flex items-center px-4 py-2">
								<img src={option?.imageUrl} alt={option?.name} className="w-14 h-14" />
								<span className="ml-2">{option?.name}</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

CustomDropdown.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.array,
};

export default CustomDropdown;
