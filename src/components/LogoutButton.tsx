import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
};

export default LogoutButton;
