import {useState, useEffect} from "react";

// ----------------------------------------------------------------------

export default function useLocalStorage(key, defaultValue) {
	const [value, setValue] = useState(() => {
		const storedValue = localStorage.getItem(key);

		try {
			return JSON.parse(storedValue);
		} catch (error) {
			return undefined;
		}
	});

	useEffect(() => {
		const listener = (e) => {
			if (e.storageArea === localStorage && e.key === key) {
				setValue(JSON.parse(e.newValue));
			}
		};

		window.addEventListener("storage", listener);

		return () => {
			window.removeEventListener("storage", listener);
		};
	}, [key, defaultValue]);

	const setValueInLocalStorage = (newValue) => {
		setValue((currentValue) => {
			const result = typeof newValue === "function" ? newValue(currentValue) : newValue;
			localStorage.setItem(key, JSON.stringify(result));
			return result;
		});
	};

	return [value, setValueInLocalStorage];
}
