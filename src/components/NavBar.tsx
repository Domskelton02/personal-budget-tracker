import { NavLink } from 'react-router-dom';
import './NavBar.css';
import LogoutButton from './LogoutButton';

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : undefined}>Home</NavLink>
      <NavLink to="/income" className={({ isActive }) => isActive ? 'active-link' : undefined}>Income</NavLink>
      <NavLink to="/expenses" className={({ isActive }) => isActive ? 'active-link' : undefined}>Expenses</NavLink>
      <NavLink to="/budget-planning" className={({ isActive }) => isActive ? 'active-link' : undefined}>Budget Planning</NavLink>
      <LogoutButton />    
      </nav>
  );
};

export default NavBar;

