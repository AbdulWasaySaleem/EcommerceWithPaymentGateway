import { Link } from "react-router-dom";
import AdminMenu from "../../Components/AdminMenu";
import Layout from "../../Components/Layout";
import {
  Home,
  Package,
  Users,
  ShoppingBag,
  TrendingUp,
  User,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    users: 0,
    orders: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleSummary = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/v1/auth/summary-orders");
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
      toast.error("Failed to fetch summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSummary();
  }, []);

  const stats = [
    {
      title: "Total Products",
      value: loading ? "..." : `${summary.products || 0}`,
      icon: Package,
      color: "blue",
    },
    {
      title: "Total Users",
      value: loading ? "..." : `${summary.users || 0}`,
      icon: Users,
      color: "green",
    },
    {
      title: "Total Orders",
      value: loading ? "..." : `${summary.orders || 0}`,
      icon: ShoppingBag,
      color: "purple",
    },
  ];
  const quickActions = [
    {
      title: "Add New Product",
      path: "/dashboard/admin/create-product",
      icon: Package,
    },
    {
      title: "Manage Categories",
      path: "/dashboard/admin/create-category",
      icon: Home,
    },
    {
      title: "View Orders",
      path: "/dashboard/admin/orders",
      icon: ShoppingBag,
    },
    {
      title: "View All Products",
      path: "/dashboard/admin/products",
      icon: TrendingUp,
    },
    {
      title: "Profile",
      path: "/dashboard/admin/profile",
      icon: User,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50/50">
        <div className="w-full px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-1/5">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="lg:w-4/5">
              {/* Welcome Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-gray-500 mt-1">
                  Welcome back! Here's what's happening
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`bg-${stat.color}-50 p-3 rounded-lg`}>
                        <stat.icon
                          className={`w-6 h-6 text-${stat.color}-500`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {stat.title}
                        </p>
                        <h3 className="text-xl font-bold text-gray-900">
                          {stat.value}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Quick Actions
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                      <Link
                        key={index}
                        to={action.path}
                        className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all duration-300"
                      >
                        <action.icon className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-gray-700">
                          {action.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
