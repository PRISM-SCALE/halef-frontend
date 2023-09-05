import {useState, useEffect, useCallback} from "react";

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

	// Function to clear localStorage every 1 hour
	const clearLocalStorageEveryHour = useCallback(() => {
		const lastUpdateTime = localStorage.getItem(`${key}_last_update_time`);
		const currentTime = new Date().getTime();

		if (!lastUpdateTime || currentTime - Number(lastUpdateTime) >= 3600000) {
			localStorage.clear();
			localStorage.setItem(`${key}_last_update_time`, currentTime);
		}
	}, [key]);

	// Call the clearLocalStorageEveryHour function every minute (adjust the interval as needed)
	useEffect(() => {
		const interval = setInterval(clearLocalStorageEveryHour, 60000);

		return () => {
			clearInterval(interval);
		};
	}, [clearLocalStorageEveryHour]);

	const setValueInLocalStorage = (newValue) => {
		setValue((currentValue) => {
			const result = typeof newValue === "function" ? newValue(currentValue) : newValue;
			localStorage.setItem(key, JSON.stringify(result));
			return result;
		});
	};

	return [value, setValueInLocalStorage];
}
