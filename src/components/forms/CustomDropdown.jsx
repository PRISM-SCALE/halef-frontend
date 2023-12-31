import {useState} from "react";
import PropTypes from "prop-types";
import {useFormContext} from "react-hook-form";
import {forwardRef} from "react";

const CustomDropdown = forwardRef(({name, options, isDisabled}, ref) => {
	const {
		watch,
		setValue,
		formState: {errors},
	} = useFormContext();
	const [isOpen, setIsOpen] = useState(false);
	const selectedOption = watch(name);

	const toggleDropdown = () => {
		if (!isDisabled) setIsOpen(!isOpen);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleOptionClick = (optionValue) => {
		toggleDropdown();
		setValue(name, optionValue);
	};

	return (
		<>
			{isOpen ? (
				<div className="fixed inset-0 bg-black opacity-0 z-10" onClick={handleClose} />
			) : null}
			<div className="relative" ref={ref}>
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

				{isOpen && !isDisabled && (
					<div className="absolute mt-2 max-h-60 overflow-y-scroll w-full bg-white border rounded shadow-md z-10">
						{options?.length !== 0 ? (
							<>
								{options?.map((option) => (
									<div
										key={option?._id}
										className={`cursor-pointer hover:bg-gray-100 transition duration-300 border-b-2 border-b-slate-50 ${
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
							</>
						) : (
							<div
								className={`cursor-pointer hover:bg-gray-100 transition duration-300 ${
									!isDisabled ? "opacity-50 cursor-not-allowed" : ""
								}`}
								disabled={true}
							>
								<div className="flex items-center px-4 py-2">
									Uh-oh! there&apos;s no vehicle available, Please try different options
								</div>
							</div>
						)}
					</div>
				)}
				{errors.vehicle && (
					<p role="alert" className="text-[#ef4444] leading-none">
						{errors.vehicle?.message}
					</p>
				)}
			</div>
		</>
	);
});

CustomDropdown.displayName = "CustomDropdown";

CustomDropdown.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.array,
	isDisabled: PropTypes.bool.isRequired,
};

export default CustomDropdown;
