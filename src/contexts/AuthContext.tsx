import React, { createContext, useState, useEffect, useContext } from 'react';
import sha256 from 'crypto-js/sha256';

interface AuthContextProps {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    if (storedIsAuthenticated) {
      setIsAuthenticated(JSON.parse(storedIsAuthenticated) as boolean);
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
        body: JSON.stringify({ email, password: sha256(password).toString() }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      setIsAuthenticated(true);
      setError(null);
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, useAuthContext };
