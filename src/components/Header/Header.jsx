import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import Toggle from "../BtnToggleTheme/Toggle.jsx";
import logo from "../../assets/logo.png";
import CartIcon from "../../assets/Cart.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

// Navigation items
const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/contact", label: "Contact Us" },
  { path: "/grocery", label: "Grocery" },
];

const NavLinks = ({ onClick, isDarkMode }) => (
  <>
    {NAV_ITEMS.map(({ path, label }) => (
      <NavLink
        key={path}
        to={path}
        onClick={onClick}
        className={({ isActive }) =>
          `relative no-underline cursor-pointer ${
            isActive
              ? "text-purple-500 font-bold"
              : isDarkMode
              ? "text-white"
              : "text-gray-900"
          } hover:text-purple-800 group`
        }
      >
        {label}
        <span className="absolute bottom-[-5px] left-0 right-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
      </NavLink>
    ))}
  </>
);

const Header = () => {
  const { isDarkMode } = useTheme();
  const [showNav, setShowNav] = useState(false);
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate(); // For redirection after signout

  const toggleNav = () => setShowNav((prev) => !prev);

  const handleCloseNav = () => {
    setShowNav(false);
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSignout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect after signout
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  // Set smooth scrolling behavior once
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <header
      className={`fixed z-50 w-full shadow-md ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-slate-200 text-black"
      }`}
    >
      <div className="container flex items-center justify-between p-4 mx-auto">
        <NavLink
          to="/"
          className="flex items-center cursor-pointer"
          onClick={handleCloseNav}
        >
          <img src={logo} alt="Logo" className="w-60 sm:w-40 md:w-40" />
        </NavLink>

        <nav className="hidden space-x-6 md:flex">
          <span
            className={`text-xl ${
              onlineStatus ? "text-green-500" : "text-red-500"
            }`}
          >
            ●
          </span>
          <NavLinks onClick={handleCloseNav} isDarkMode={isDarkMode} />
        </nav>

        <div className="flex items-center space-x-4">
          <Toggle className="mx-4" />

          <NavLink
            to={user ? "/" : "/login"}
            onClick={user ? handleSignout : null}
            className={({ isActive }) =>
              `relative no-underline cursor-pointer ${
                isActive
                  ? "text-purple-500 font-bold"
                  : isDarkMode
                  ? "text-white"
                  : "text-gray-900"
              } hover:text-purple-500 group`
            }
          >
            {user ? "Logout" : "Login"}
            <span className="absolute bottom-[-5px] left-0 right-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </NavLink>

          <NavLink
            to="/cart"
            className={`relative flex items-center cursor-pointer group ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <CartIcon className="w-6 h-6 text-current transition-all duration-300 group-hover:text-purple-400" />
            {cartItems.length > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                {cartItems.length}
              </span>
            )}
            <span className="absolute bottom-[-5px] left-0 right-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </NavLink>

          <button
            className="text-center cursor-pointer md:hidden focus:outline-none"
            onClick={toggleNav}
            aria-label="Toggle navigation menu"
            aria-expanded={showNav}
          >
            {showNav ? (
              <span className="text-3xl font-bold">✕</span>
            ) : (
              <div className="space-y-1">
                <div
                  className={`w-6 h-1 ${
                    isDarkMode ? "bg-white" : "bg-gray-950"
                  }`}
                ></div>
                <div
                  className={`w-6 h-1 ${
                    isDarkMode ? "bg-white" : "bg-gray-950"
                  }`}
                ></div>
                <div
                  className={`w-6 h-1 ${
                    isDarkMode ? "bg-white" : "bg-gray-950"
                  }`}
                ></div>
              </div>
            )}
          </button>
        </div>
      </div>

      <div
        className={`absolute top-full left-0 w-full ${
          showNav ? "block" : "hidden"
        } ${
          isDarkMode ? "bg-gray-950 text-white" : "bg-slate-200 text-black"
        } md:hidden`}
      >
        <nav className="flex flex-col items-center py-8 space-y-4">
          <NavLinks onClick={handleCloseNav} isDarkMode={isDarkMode} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
