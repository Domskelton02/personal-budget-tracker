import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { isEmailValid } from "../utils/validations";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      await login(email, password);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      toast.error((error as Error).message || "Failed to log in");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 px-4">
      <header className="mb-4">
        <h1 className="text-4xl font-extrabold text-gray-800">Personal Budget Tracker</h1>
      </header>
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;