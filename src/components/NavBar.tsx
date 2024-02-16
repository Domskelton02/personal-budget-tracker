import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const NavBar = () => {
  const linkStyle = "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkStyle = "text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-300 text-black font-bold";

  return (
    <nav className="bg-gray-800 overflow-hidden py-3 px-5 flex justify-between">
      <div className="flex gap-4">
        <NavLink to="/" className={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
          Home
        </NavLink>
        <NavLink to="/income" className={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
          Income
        </NavLink>
        <NavLink to="/expenses" className={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
          Expenses
        </NavLink>
        <NavLink to="/budget-planning" className={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
          Budget Planning
        </NavLink>
      </div>
      <LogoutButton />
    </nav>
  );
};

export default NavBar;
