import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import { FaUserLarge } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import logo from '../../../assets/icon/icons8-travel-agency-48.png';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch(error => console.log(error));
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/package">Trips</NavLink></li>
      <li><NavLink to="/community">Community</NavLink></li>
      <li><NavLink to="/aboutUs">About Us</NavLink></li>
      <li>
        <NavLink to="/dashboard/cart">
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed z-10 bg-opacity-30 bg-black text-white  w-full ">
      <div className='w-11/12  mx-auto navbar'>
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          {dropdownOpen && (
            <ul className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          )}
        </div>

        {/* Logo + Website Name */}
        <Link to="/" className="flex items-center gap-2">
          <img className="w-[40px]" src={logo} alt="Logo" />
          <h1 className="text-xl font-semibold">Ghure Ashi</h1>
        </Link>
      </div>

      {/* Center Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal justify-center items-center text-bold text-[16px] px-1">
          {links}
        </ul>
      </div>

      {/* User Section */}
      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <div className="relative">
            {/* User Avatar */}
            <button
              className="flex items-center gap-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img className="w-[40px] h-[40px] rounded-full" src={user.photoURL} alt="Profile" />
              <MdOutlineKeyboardArrowDown className="text-xl" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg py-2">
                <p className="px-4 py-2 font-semibold">{user.displayName}</p>
                <p className="px-4 text-sm text-gray-500">{user.email}</p>
                <hr />
                <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-gray-200">Dashboard</NavLink>
                <NavLink to="/offers" className="block px-4 py-2 hover:bg-gray-200">Offer Announcements</NavLink>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white">
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-neutral">Login / Register</NavLink>
        )}
      </div>
    </div>
    </div>
  );
};

export default Navbar;
