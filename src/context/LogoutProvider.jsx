import PropTypes from "prop-types";
import {createContext, useContext, useState} from "react";
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

	const login = () => {
		localStorage.setItem("isLoggedIn", "true");
		console.log(values);
		setIsLoggedIn(true);
	};

	const logout = () => {
		localStorage.removeItem("isLoggedIn");
		localStorage.removeItem("userData");
		setValueToLocalStorage(null);
		localStorage.clear();
		navigate({pathname: "/"}, {replace: true});
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{isLoggedIn, login, logout}}>{children}</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
