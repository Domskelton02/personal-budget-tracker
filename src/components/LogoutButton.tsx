// LogoutButton.jsx or LogoutButton.tsx
import React from 'react';
import { useAuthContext } from '../contexts/AuthContext'; // Adjust the import path as necessary

const LogoutButton = () => {
  const { logout } = useAuthContext(); // Use your AuthContext's logout function

  const handleLogout = () => {
    logout();
    // Optionally redirect to the login page or other actions post logout
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
};

export default LogoutButton;
