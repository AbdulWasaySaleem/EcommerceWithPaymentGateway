import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/cart";
import { Menu, X, ShoppingCart, ChevronDown, User, LogOut, Layout } from "lucide-react";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
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

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white text-xl font-bold hover:text-blue-400 transition-colors duration-200"
          >
            <span className="text-2xl">🛒</span>
            <span className="hidden sm:inline">MyCompany</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/">Home</NavLink>

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
              <>
                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
                      {auth?.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden lg:inline">{auth?.user?.name}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {auth?.user?.email}
                        </p>
                      </div>

                      <div className="py-2">
                        <Link
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Layout className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>

                        {auth?.user?.role === 1 && (
                          <Link
                            to="/dashboard/user"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <User className="w-4 h-4 mr-2" />
                            Switch to User View
                          </Link>
                        )}
                      </div>

                      <div className="py-2 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cart */}
                <Link 
                  to="/Cart" 
                  className="relative group text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <span className="flex items-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="hidden sm:inline">Cart</span>
                  </span>
                  {cart?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold group-hover:bg-red-600 transition-colors">
                      {cart.length > 99 ? '99+' : cart.length}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700 mt-2 py-4">
            <div className="space-y-2 px-2">
              <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </NavLink>

              {!auth.user ? (
                <div className="space-y-2">
                  <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Login
                  </NavLink>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-base font-medium text-center transition-all duration-200"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="px-3 py-2 bg-white/5 rounded-lg">
                    <p className="text-sm text-gray-400">Signed in as</p>
                    <p className="text-sm font-medium text-white truncate">
                      {auth?.user?.name}
                    </p>
                  </div>

                  <NavLink 
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Layout className="w-5 h-5 inline-block mr-2" />
                    Dashboard
                  </NavLink>

                  {auth?.user?.role === 1 && (
                    <NavLink 
                      to="/dashboard/user"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5 inline-block mr-2" />
                      Switch to User View
                    </NavLink>
                  )}

                  <NavLink 
                    to="/Cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Cart
                      </span>
                      {cart?.length > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                          {cart.length > 99 ? '99+' : cart.length}
                        </span>
                      )}
                    </div>
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-400 hover:text-red-300 hover:bg-red-900/20 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5 inline-block mr-2" />
                    Logout
                  </button>
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