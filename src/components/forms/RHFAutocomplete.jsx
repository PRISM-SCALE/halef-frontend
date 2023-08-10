import PropTypes from "prop-types";
import {Autocomplete, TextField} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";

const RHFAutocomplete = ({
	name,
	options,
	value,
	onChange,
	onInputChange,
	placeholder,
	getOptionLabel,
	noOptionsText,
	rules,
	...others
}) => {
	const {control} = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({fieldState: {error}}) => {
				return (
					<>
						<Autocomplete
							getOptionLabel={getOptionLabel} // * (option) => option.label ?? option
							filterOptions={(x) => x}
							options={options.map((option) => ({
								...option,
								key: option._id,
							}))}
							autoComplete
							includeInputInList
							filterSelectedOptions
							value={value}
							noOptionsText={noOptionsText}
							isOptionEqualToValue={(option, value) => option._id === value._id}
							onChange={onChange}
							onInputChange={onInputChange}
							renderInput={(params) => (
								<>
									<TextField
										className="input-fields  appearance-none rounded-none"
										{...params}
										// {...field}
										placeholder={placeholder}
										error={!!error}
										helperText={error?.message}
										inputProps={{
											...params.inputProps,
											autoComplete: "new-password", // disable autocomplete and autofill
										}}
										{...others}
									/>
								</>
							)}
						/>
					</>
				);
			}}
		/>
	);
};

RHFAutocomplete.propTypes = {
	name: PropTypes.string.isRequired,
	rules: PropTypes.object.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	onInputChange: PropTypes.func.isRequired,
	getOptionLabel: PropTypes.func.isRequired,
	noOptionsText: PropTypes.string.isRequired,
};

export default RHFAutocomplete;
