import React, { createContext, useContext, useState, useEffect } from 'react';
import sha256 from 'crypto-js/sha256';


interface User {
    email: string;
    password: string;
    // Add other user properties as needed
}

interface AuthContextProps {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoggedIn: boolean;
    // Add other functions and values as needed
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn) {
            setIsLoggedIn(JSON.parse(storedIsLoggedIn));
        }

        // Fetch users as before
    }, []);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    const login = async (email: string, password: string) => {
        const user = users.find(user => user.email === email);
        const passwordHash = await sha256(password);

        if (!user || user.password !== passwordHash) {
            setError('Invalid email or password');
            throw new Error('Invalid email or password');
        }

        setIsLoggedIn(true);
        setError(null);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn, error }}>
            {children}
        </AuthContext.Provider>
    );
};