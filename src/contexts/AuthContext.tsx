import React, { createContext, useState, useEffect } from 'react';
import sha256 from 'crypto-js/sha256';

interface User {
  email: string;
  password: string;
}

interface AuthContextProps {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;

}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    if (storedIsAuthenticated) {
      setIsAuthenticated(JSON.parse(storedIsAuthenticated));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: sha256(password).toString() }), // Sending hashed password
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const userData = await response.json();
      setIsAuthenticated(true);
      setError(null);
    } catch (error) {
      setError('Invalid email or password');
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
