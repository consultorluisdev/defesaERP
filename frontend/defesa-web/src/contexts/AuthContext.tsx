import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import api from "../services/api";

interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
}

interface AuthContextData {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (userData: { email: string; password: string; name?: string; role?: string }) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    setError: (error: string | null) => void;
    isAuthenticated: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStoredData = async () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');

            if (token && userData) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setUser(JSON.parse(userData));
            }
            setLoading(false);
        };
        loadStoredData();
    }, []);
    const login = async (email: string, password: string) => {
        try{
            setError(null);
            const response = await api.post('/Auth/login', {
                email,
                passwordHash: password,
            });

            const { token } = response.data;
            const user = {
                id: email,
                email,
                name: email,
            };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(user);
            return { success: true};
        }catch(error : any){
            const message = error.response?.data?.message || error.response?.data || 'Erro ao fazer login';
            setError(message);
            return{ success: false, error: message };
            
        }
    };
    const register = async (userData: { email: string; password: string; name?: string; role?: string }) => {
        try{
            setError(null);
            await api.post('/Auth/register', {
                email: userData.email,
                passwordHash: userData.password,
            });
            return { success: true };
        }catch (error: any){
            const message = error.response?.data?.message || error.response?.data || 'Erro ao registrar';
            setError(message);
            return { success: false, error: message };
        }

    };
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };
    return(
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            login,
            register,
            logout,
            setError,
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
