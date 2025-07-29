import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/cart";
import {
  Menu,
  X,
  ShoppingCart,
  ChevronDown,
  User,
  LogOut,
  Layout,
} from "lucide-react";
import DevBanner from "./common/DevBanner";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const { cart } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when navigating
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
    navigate("/login");
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Reusable components
  const NavLink = ({ to, children, onClick, className = "" }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${className}`}
    >
      {children}
    </Link>
  );

  const MobileNavLink = ({ to, children, onClick, className = "" }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center text-gray-200 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 min-h-[48px] ${className}`}
    >
      {children}
    </Link>
  );

  const CartButton = ({ onClick, className = "", isMobile = false }) => (
    <Link
      to="/Cart"
      onClick={onClick}
      className={`relative group text-gray-300 hover:text-white hover:bg-white/10 ${
        isMobile 
          ? "flex items-center px-4 py-3 rounded-xl text-base font-medium min-h-[48px]" 
          : "px-4 py-2 rounded-lg text-sm font-medium"
      } transition-all duration-200 ${className}`}
    >
      <span className="flex items-center space-x-3">
        <ShoppingCart className={isMobile ? "w-6 h-6" : "w-5 h-5"} />
        <span className={isMobile ? "inline" : "hidden sm:inline"}>Cart</span>
      </span>
      {cart?.length > 0 && (
        <span className={`absolute ${
          isMobile ? "-top-1 left-7" : "-top-1 -right-1"
        } bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold group-hover:bg-red-600 transition-colors`}>
          {cart.length > 99 ? "99+" : cart.length}
        </span>
      )}
    </Link>
  );

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <DevBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center space-x-2 text-white text-xl font-bold hover:text-blue-400 transition-colors duration-200 min-h-[44px] min-w-[44px]"
          >
            <span className="text-2xl">🛒</span>
            <span className="hidden xs:inline sm:inline">SwiftBuy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/">Home</NavLink>
            <CartButton />
            {!auth.user ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
                    {auth?.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:inline">{auth?.user?.name}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 text-sm">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-gray-500">Signed in as</p>
                      <p className="font-medium text-gray-900 truncate">
                        {auth?.user?.email}
                      </p>
                    </div>
                    <div>
                      <Link
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Layout className="w-4 h-4 mr-2" /> Dashboard
                      </Link>
                      {auth?.user?.role === 1 && (
                        <Link
                          to="/dashboard/user"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <User className="w-4 h-4 mr-2" /> Switch to User
                        </Link>
                      )}
                    </div>
                    <div className="border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-red-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Cart Button */}
            <CartButton onClick={closeMobileMenu} className="p-2" />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700/50">
            <div className="px-2 py-4 space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto">
              {/* Navigation Links */}
              <div className="space-y-1">
                <MobileNavLink to="/" onClick={closeMobileMenu}>
                  <span className="flex items-center space-x-3">
                    <span>Home</span>
                  </span>
                </MobileNavLink>
              </div>

              {/* Authentication Section */}
              {!auth.user ? (
                <div className="border-t border-gray-700/50 pt-4 mt-4 space-y-1">
                  <MobileNavLink to="/login" onClick={closeMobileMenu}>
                    <span className="flex items-center space-x-3">
                      <span className="text-lg">👤</span>
                      <span>Login</span>
                    </span>
                  </MobileNavLink>
                  
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl text-base font-medium shadow-md hover:shadow-lg transition-all duration-200 min-h-[48px] mx-2"
                  >
                    <span className="flex items-center space-x-3">
                      <span className="text-lg">✨</span>
                      <span>Register</span>
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="border-t border-gray-700/50 pt-4 mt-4">
                  {/* User Info */}
                  <div className="px-4 py-3 mx-2 rounded-xl bg-white/5 text-white mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-md text-lg font-semibold">
                        {auth?.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">Signed in as</p>
                        <p className="font-medium text-white truncate">
                          {auth?.user?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* User Menu Items */}
                  <div className="space-y-1">
                    <MobileNavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      onClick={closeMobileMenu}
                    >
                      <span className="flex items-center space-x-3">
                        <Layout className="w-6 h-6" />
                        <span>Dashboard</span>
                      </span>
                    </MobileNavLink>

                    {auth?.user?.role === 1 && (
                      <MobileNavLink
                        to="/dashboard/user"
                        onClick={closeMobileMenu}
                      >
                        <span className="flex items-center space-x-3">
                          <User className="w-6 h-6" />
                          <span>Switch to User</span>
                        </span>
                      </MobileNavLink>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center text-red-400 hover:text-red-300 hover:bg-red-900/20 px-4 py-3 rounded-xl transition-all duration-200 min-h-[48px] mx-2"
                    >
                      <span className="flex items-center space-x-3">
                        <LogOut className="w-6 h-6" />
                        <span className="text-base font-medium">Logout</span>
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;