import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import {
  User,
  Package,
  ShoppingBag,
  LogOut,
  PlusCircle,
  LayoutGrid,
  Shield,
  Home
} from "lucide-react";
import { toast } from "react-toastify";
import moment from "moment";

const AdminMenu = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      path: "/dashboard/admin",
      icon: <Home size={20} />,
      label: "Dashboard",
      exact: true,
    },
    {
      path: "/dashboard/admin/profile",
      icon: <User size={20} />,
      label: "Profile",
    },
    {
      path: "/dashboard/admin/create-category",
      icon: <PlusCircle size={20} />,
      label: "Create Category",
    },
    {
      path: "/dashboard/admin/create-product",
      icon: <Package size={20} />,
      label: "Create Product",
    },
    {
      path: "/dashboard/admin/products",
      icon: <LayoutGrid size={20} />,
      label: "All Products",
    },
    {
      path: "/dashboard/admin/orders",
      icon: <ShoppingBag size={20} />,
      label: "Orders",
    },
  ];

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Mobile View Component
  const MobileView = () => (
    <div className="md:hidden w-full bg-white shadow-md">
      {/* User Info Strip */}
      <div className="flex items-center p-4 border-b">
        <img
          className="w-10 h-10 rounded-full border-2 border-white shadow"
          src={
            auth?.user?.photo ||
            "https://i.pinimg.com/564x/14/a0/9c/14a09c943e7b0b75da636c5ea23df82a.jpg"
          }
          alt={auth?.user?.name}
        />
        <div className="ml-3">
          <h3 className="font-semibold text-sm">{auth?.user?.name}</h3>
          <p className="text-xs text-gray-500">{auth?.user?.email}</p>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex overflow-x-auto no-scrollbar border-b">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex-shrink-0 px-4 py-3 flex flex-col items-center justify-center
              ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`
            }
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="flex-shrink-0 px-4 py-3 flex flex-col items-center justify-center text-red-600"
        >
          <LogOut size={20} />
          <span className="text-xs mt-1">Logout</span>
        </button>
      </div>
    </div>
  );

  // Desktop View Component
  const DesktopView = () => (
    <div className="hidden md:block bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-lg p-6">
      {/* Admin Header Section */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <img
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
            src={
              auth?.user?.photo ||
              "https://i.pinimg.com/564x/14/a0/9c/14a09c943e7b0b75da636c5ea23df82a.jpg"
            }
            alt={auth?.user?.name}
          />
          <div className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
        </div>

        <div className="mt-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            {auth?.user?.name}
          </h2>
          <p className="text-sm text-gray-500">{auth?.user?.email}</p>
          <span className="inline-flex items-center mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            <Shield size={14} className="mr-1" />
            Admin Panel
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-all duration-200 
              ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium shadow-sm"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              }`
            }
          >
            <span className="inline-block mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </nav>

      {/* Footer Section */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-xs text-center text-gray-500">
          Member since {moment(auth?.user?.createdAt).format("MMMM YYYY")}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
};

export default AdminMenu;
