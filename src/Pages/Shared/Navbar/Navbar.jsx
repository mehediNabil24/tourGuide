import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import { FaUserLarge } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../../.././assets/icon/icons8-travel-agency-48.png'

const Navbar = () => {
  const {user, logOut } = useContext(AuthContext)
  const handleLogout =()=>{
    logOut()
    .then(()=>{})
    .catch( error =>{
      console.log(error)
    })
  }
  const links = <>
     <li><Link to={'/'}>Home</Link></li>
  <li><Link to={'/package'}>Our Packages</Link></li>
  <li><Link to={'/Community'}>Community</Link></li>
  <li><Link to={'/aboutUs'}>About Us</Link></li>
  <li><Link to={'/dashboard/cart'}><button className="btn ">
  <FaShoppingCart />
  <div className="badge   badge-secondary"></div>
</button></Link></li>
  
    {
     
      user? <>  <button onClick={handleLogout} className='btn btn-ghost'>Logout</button></>: <><li><Link to={'/login'}>Login</Link></li></>
    }
  
     
      
    </>
    return (
        <>
        <div className="fixed z-10 bg-opacity-30 bg-black text-white navbar mx-auto max-w-screen-lg">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
    {
        links

    }
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Ghure Ashi</a>
    <img src={logo} alt="" />
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal justify-center items-center px-1">
      {
        links
      }
    </ul>
  </div>
  <div className="navbar-end">
  <div className="flex items-center justify-center gap-2">
            <div>
              {user?.email ? (
                <div className="flex flex-col items-center justify-center mr-2 ">
                  <p>{user.displayName}</p>
                  <img
                    className="w-[50px] h-[50px] rounded-full"
                    src={user.photoURL}
                    alt=""
                  />
                </div>
              ) : (
                <FaUserLarge className="text-2xl"></FaUserLarge>
              )}
            </div>

            <div>
              {user ? (
                <button onClick={logOut} className="btn btn-neutral">
                  Log out
                </button>
              ) : (
                <NavLink to={"/login"} className="btn btn-neutral">
                  Log in{" "}
                </NavLink>
              )}
            </div>
          </div>
  </div>
</div>
            
        </>
    );
};

export default Navbar;