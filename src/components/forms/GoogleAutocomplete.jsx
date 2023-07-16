import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import {debounce} from "@mui/material/utils";
import {Icon} from "@iconify-icon/react";

const autocompleteService = {current: null};

export default function GoogleAutocomplete() {
	const [value, setValue] = React.useState(null);
	const [inputValue, setInputValue] = React.useState("");
	const [options, setOptions] = React.useState([]);

	const fetch = React.useMemo(
		() =>
			debounce((request, callback) => {
				autocompleteService.current.getPlacePredictions(request, callback);
			}, 400),
		[]
	);

	React.useEffect(() => {
		let active = true;

		if (!autocompleteService.current && window.google) {
			autocompleteService.current = new window.google.maps.places.AutocompleteService();
		}
		if (!autocompleteService.current) {
			return undefined;
		}

		if (inputValue === "") {
			setOptions(value ? [value] : []);
			return undefined;
		}

		fetch({input: inputValue}, (results) => {
			if (active) {
				let newOptions = [];

				if (value) {
					newOptions = [value];
				}

				if (results) {
					newOptions = [...newOptions, ...results];
				}

				setOptions(newOptions);
			}
		});

		return () => {
			active = false;
		};
	}, [value, inputValue, fetch]);

	return (
		<Autocomplete
			getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			value={value}
			noOptionsText="No locations"
			onChange={(event, newValue) => {
				setOptions(newValue ? [newValue, ...options] : options);
				setValue(newValue);
			}}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			renderInput={(params) => <TextField {...params} label="Pickup Location" fullWidth />}
			renderOption={(props, option) => {
				const matches = option.structured_formatting.main_text_matched_substrings || [];

				const parts = parse(
					option.structured_formatting.main_text,
					matches.map((match) => [match.offset, match.offset + match.length])
				);

				return (
					<li {...props}>
						<Grid container alignItems="center">
							<Grid item sx={{display: "flex", width: 44}}>
								<Icon icon="mingcute:location-fill" />
							</Grid>
							<Grid item sx={{width: "calc(100% - 44px)", wordWrap: "break-word"}}>
								{parts.map((part, index) => (
									<Box
										key={index}
										component="span"
										sx={{fontWeight: part.highlight ? "bold" : "regular"}}
									>
										{part.text}
									</Box>
								))}
								<Typography variant="body2" color="text.secondary">
									{option.structured_formatting.secondary_text}
								</Typography>
							</Grid>
						</Grid>
					</li>
				);
			}}
		/>
	);
}
