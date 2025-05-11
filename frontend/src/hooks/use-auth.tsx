import { useLocalStorage } from "@/hooks";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

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
	const location = useLocation();
	const [token, setToken, removeToken] = useLocalStorage("auth", "");
	const [user, setUser] = useState<User | undefined>(
		token ? jwtDecode<User>(token) : undefined,
	);

	const login = (token: string) => {
		setToken(token);
		setUser(jwtDecode<User>(token));
		navigate("/");
	};
	const logout = () => {
		removeToken();
	};

	useEffect(() => {
		const isAuthPage =
			location.pathname === "/sign-in" ||
			location.pathname === "/sign-up";
		const isOrdersPage = location.pathname === "/orders";

		if (!user && isOrdersPage) {
			navigate("/sign-in");
		} else if (user && isAuthPage) {
			navigate("/");
		}
	}, [location.pathname, navigate, user]);

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
