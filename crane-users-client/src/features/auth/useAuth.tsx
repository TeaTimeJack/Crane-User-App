
import { createContext, useContext, useState} from "react";
import type {ReactNode} from 'react'
import axios from "axios";
import type {UserTypeFromAPI} from '../../types/types.ts'

interface AuthContextType {
    isAuthenticated: boolean;
    login: (user: UserTypeFromAPI, token: string) => void;
    logOut: () => void;
    refreshToken: () => Promise<void>;
    user: UserTypeFromAPI | null; 
    token: string | null; 
}


const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {}, 
    logOut: () => {}, 
    refreshToken: async () => {}, 
    user: null,
    token: null,
});


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};


interface AuthProviderProps {
    children: ReactNode; 
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserTypeFromAPI | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (userData: UserTypeFromAPI, userToken: string) => {
        setUser(userData);
        setToken(userToken);
    };

    const logOut = () => {
        setUser(null);
        setToken(null);
    };

    const refreshToken = async () => {
        // 'http://localhost:5005/api/user/auth'
        try {
            const response = await axios.get<{ user: UserTypeFromAPI, token: string }>(import.meta.env.VITE_BASE_URL+"/user/auth/", {
                withCredentials: true
            });
            const { user: refreshedUser, token: refreshedToken } = response.data;
            login(refreshedUser, refreshedToken);

        } catch (error) {
            console.error("Error refreshing token:", error);
            logOut();
        }
    };

    const isAuthenticated = !!user && !!token;

    const contextValue: AuthContextType = {
        isAuthenticated,
        login,
        logOut,
        refreshToken,
        user,
        token
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};