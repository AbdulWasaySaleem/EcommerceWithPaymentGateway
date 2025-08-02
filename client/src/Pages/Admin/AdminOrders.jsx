import { useState, useEffect } from "react";
import AdminMenu from "../../Components/AdminMenu";
import Layout from "../../Components/Layout";
import { Select } from "antd";
import { useAuth } from "../../context/authContext";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import Breadcrumbs from "../../Components/Breadcrumbs";
import getErrorMessage from "../../utils/getErrorMessage";
import { toast } from "react-toastify";

const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliver",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);

  const getOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/v1/auth/allorders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axiosInstance.put(`/v1/auth/orderstatus/${orderId}`, {
        status: value,
      });
      getOrder();
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error, "Error creating category"));
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50/50">
        <div className="w-full px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-1/5">
              <AdminMenu />
            </div>

            {/* Orders Section */}
            <div className="lg:w-4/5">
            <Breadcrumbs
                items={[{ name: "Admin" }, { name: "Orders", active: true }]}
              />
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">All Orders</h1>
                <p className="text-gray-500 mt-1">Manage and track customer orders</p>
              </div>

              {loading ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <p className="text-center text-gray-600">Loading orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <p className="text-center text-gray-600">No orders found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-white rounded-lg shadow p-4 space-y-3 border"
                    >
                      {/* Row 1: Order Info */}
                      <div className="flex flex-wrap justify-between text-sm text-gray-600">
                        <span className="font-semibold text-gray-800">
                          Order #{order._id.slice(-6)}
                        </span>
                        <span>
                          Customer: {order.buyer?.name}
                        </span>
                        <span>
                          {moment(order.createdAt).format("MMM Do YYYY, h:mm A")}
                        </span>
                        <span
                          className={
                            order.payment?.success
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {order.payment?.success ? "✓ Paid" : "✗ Payment Failed"}
                        </span>
                      </div>

                      {/* Row 2: Products */}
                      {order.products.map((product) => (
                        <div
                          key={product._id}
                          className="flex items-start gap-4 border-t pt-4 mt-2"
                        >
                          <img
                            src={product?.photo?.url || "/api/placeholder/80/80"}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded border"
                            onError={(e) => (e.target.src = "/api/placeholder/80/80")}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 truncate max-w-[500px]">
                              {product.name}
                            </h4>
                            <p className="text-gray-500 text-sm truncate max-w-[600px]">
                              {product.description}
                            </p>
                            <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                              <span>Quantity: {order.products.length}</span>
                              <span>${product.price?.toLocaleString()}</span>
                              <div className="flex items-center gap-2">
                                <span>Status:</span>
                                <Select
                                  defaultValue={order.status}
                                  onChange={(value) => handleChange(order._id, value)}
                                  className="min-w-[120px]"
                                >
                                  {status.map((s) => (
                                    <Option key={s} value={s}>
                                      {s}
                                    </Option>
                                  ))}
                                </Select>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Row 3: Order Summary */}
                      <div className="flex justify-between items-center pt-3 border-t text-sm">
                        <span className="font-medium text-gray-600">
                          Total Items: {order.products.length}
                        </span>
                        <span className="font-bold text-gray-900">
                          Total Amount: ${order.products.reduce((sum, item) => sum + (item.price || 0), 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;