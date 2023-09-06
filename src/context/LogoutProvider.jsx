import PropTypes from "prop-types";
import {createContext, useContext, useState, useEffect, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

AuthProvider.propTypes = {
	children: PropTypes.node,
};

export function AuthProvider({children}) {
	const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
	const [values, setValueToLocalStorage] = useLocalStorage("userData");
	const navigate = useNavigate();

	// Function to clear local storage
	const clearLocalStorage = useCallback(() => {
		localStorage.removeItem("isLoggedIn");
		localStorage.removeItem("userData");
		setValueToLocalStorage(null);
		localStorage.clear();
		setIsLoggedIn(false);
	}, [setValueToLocalStorage]);

	const login = () => {
		localStorage.setItem("isLoggedIn", "true");
		console.log(values);
		setIsLoggedIn(true);
	};

	const logout = () => {
		clearLocalStorage();
		navigate({pathname: "/"}, {replace: true});
	};

	// Set up a timer to clear local storage every hour
	useEffect(() => {
		const intervalId = setInterval(() => {
			clearLocalStorage();
		}, 3600000); // 3600000 milliseconds = 1 hour

		// Clean up the timer when the component unmounts
		return () => clearInterval(intervalId);
	}, [clearLocalStorage]);

	return (
		<AuthContext.Provider value={{isLoggedIn, login, logout}}>{children}</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
