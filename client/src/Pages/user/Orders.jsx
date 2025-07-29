import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import UserMenu from "../../Components/UserMenu";
import { useAuth } from "../../context/authContext";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import Breadcrumbs from "../../Components/Breadcrumbs";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrder = async () => {
    try {
      const { data } = await axiosInstance.get("/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);

  const calculateOrderTotal = (products) =>
    products.reduce((total, p) => total + (p.price || 0), 0);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50/50">
        <div className="w-full px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-1/5">
              <UserMenu />
            </div>

            {/* Orders Section */}
            <div className="lg:w-4/5">
            <Breadcrumbs
                items={[{ name: "Dashboard" }, { name: "Orders", active: true }]}
              />
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                <p className="text-gray-500 mt-1">View and track your orders</p>
              </div>

              {orders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <p className="text-center text-gray-600">
                    You have no orders yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, i) => (
                    <div
                      key={order._id}
                      className="bg-white rounded-lg shadow p-4 space-y-3 border"
                    >
                      {/* Row 1: Order Info */}
                      <div className="flex flex-wrap justify-between text-sm text-gray-600">
                        <span className="font-semibold text-gray-800">
                          Order #{i + 1}
                        </span>
                        <span>
                          {moment(order.createdAt).format(
                            "MMM Do YYYY, h:mm A"
                          )}
                        </span>
                        <span
                          className={
                            order.payment?.success
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {order.payment?.success
                            ? "✓ Paid"
                            : "✗ Payment Failed"}
                        </span>
                      </div>

                      {/* Row 2: Product Info */}
                      {order.products.map((product) => (
                        <div
                          key={product._id}
                          className="flex items-start gap-4 border-t pt-4 mt-2"
                        >
                          <img
                            src={
                              product?.photo?.url || "/api/placeholder/80/80"
                            }
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded border"
                            onError={(e) =>
                              (e.target.src = "/api/placeholder/80/80")
                            }
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 truncate">
                              {product.name}
                            </h4>
                            <p className="text-gray-500 text-sm truncate ">
                              {product.description}
                            </p>
                            <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                              <span>Items: {order.products.length}</span>
                              <span>
                                Total: $
                                {calculateOrderTotal(
                                  order.products
                                ).toLocaleString()}
                              </span>
                              <span>Status: {order.status}</span>
                            </div>
                          </div>
                        </div>
                      ))}
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

export default Orders;
