import React, { useState, useEffect, FunctionComponent } from "react";
import { AuthContext, AuthContextProps } from "./AuthContext"; // Make sure this import is correct
import sha256 from "crypto-js/sha256";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    if (storedIsAuthenticated) {
      setIsAuthenticated(JSON.parse(storedIsAuthenticated));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: sha256(password).toString() }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      setIsAuthenticated(true);
      setError(null);
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  const contextValue: AuthContextProps = {
    login,
    logout,
    isAuthenticated,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
