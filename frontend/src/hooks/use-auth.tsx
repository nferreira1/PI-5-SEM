import { useLocalStorage } from "@/hooks";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router";

export type User = Schema["UserEntity_List"];

type AuthContextType = {
	token: string;
	user: User | undefined;
	login: (token: string) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider() {
	const navigate = useNavigate();
	const [user, setUser] = useState<User>();
	const [token, setToken, removeToken] = useLocalStorage("auth", "");

	const login = (token: string) => {
		setToken(token);
		setUser(jwtDecode<User>(token));
		navigate("/");
	};
	const logout = () => {
		removeToken();
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				user,
				login,
				logout,
			}}
		>
			<Outlet />
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}

	return context;
}
