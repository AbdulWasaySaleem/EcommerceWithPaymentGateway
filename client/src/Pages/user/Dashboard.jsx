import{ useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import UserMenu from "../../Components/UserMenu";
import { Link } from "react-router-dom";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  ShoppingBag,
  Users,
  Home,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/authContext";
import Breadcrumbs from "../../Components/Breadcrumbs";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);

  const getOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);

  // Calculate stats from real data
  const getOrderStats = () => {
    const totalOrders = orders.length;
    const processingOrders = orders.filter(
      (order) => order.status === "Not Process"
    ).length;
    const canceledOrders = orders.filter(
      (order) => order.status === "cancel"
    ).length;
    const successfulOrders = orders.filter(
      (order) => order.status === "completed"
    ).length;

    return [
      {
        label: "Total Orders",
        value: totalOrders,
        icon: Package,
        color: "blue",
        bgColor: "bg-blue-50",
      },
      {
        label: "Processing",
        value: processingOrders,
        icon: Clock,
        color: "yellow",
        bgColor: "bg-yellow-50",
      },
      {
        label: "Completed",
        value: successfulOrders,
        icon: CheckCircle,
        color: "green",
        bgColor: "bg-green-50",
      },
      {
        label: "Cancelled",
        value: canceledOrders,
        icon: XCircle,
        color: "red",
        bgColor: "bg-red-50",
      },
    ];
  };

  const quickActions = [
    { label: "View Profile", to: "/dashboard/user/profiles", icon: Users },
    { label: "My Orders", to: "/dashboard/user/orders", icon: Package },
    { label: "Go to Store", to: "/", icon: Home },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50/50">
        <div className="w-full px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-1/5">
              <UserMenu />
            </div>

            {/* Main Content */}
            <div className="lg:w-4/5 space-y-6">
              {/* Welcome Banner */}
              <Breadcrumbs
                items={[{ name: "Dashboard" }, { name: "user", active: true }]}
              />
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Welcome back, {auth?.user?.name}
                    </h1>
                    <p className="text-gray-500 mt-1">
                      Here's what's happening with your orders today.
                    </p>
                  </div>
                  <Link
                    to="/dashboard/user/orders"
                    className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    View All Orders
                  </Link>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                {getOrderStats().map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <div className={`${stat.bgColor} p-2 rounded-lg`}>
                        <stat.icon
                          className={`w-5 h-5 text-${stat.color}-600`}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-xl font-semibold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Quick Actions
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => {
                      const IconComponent = action.icon;
                      return (
                        <Link
                          key={index}
                          to={action.to}
                          className="group flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="ml-3 font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {action.label}
                          </span>
                          <ArrowRight className="ml-auto w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </Link>
                      );
                    })}
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

export default Dashboard;
