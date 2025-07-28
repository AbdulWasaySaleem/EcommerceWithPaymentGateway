import React, { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cart";

const CartSummary = ({ cart, totalAmount }) => {
  //console.log("cart",cart[0].cartQuantity)
  const [auth] = useAuth();
  const [_, setCart] = useCart(); // unused cart from hook
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token) return;
    const fetchClientToken = async () => {
      try {
        const { data } = await axiosInstance.get("/v1/product/braintree/token");
        setClientToken(data.clientToken);
      } catch (err) {
        console.error("Error fetching Braintree token:", err);
      }
    };
    fetchClientToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    if (!instance) return;
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();

      const { data } = await axiosInstance.post(
        "/v1/product/braintree/payment",
        { nonce, cart },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      toast.success("Payment successful!");
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
    } catch (err) {
      console.error("Payment Error:", err.response || err.message);
      toast.error("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!clientToken || cart.length === 0) return null;

  return (
    <div className="border p-6 rounded-lg shadow-md bg-white sticky top-20">
      <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Total Items:</span>
        <span>
          {cart.reduce((total, item) => total + (item.cartQuantity || 1), 0)}
        </span>
      </div>

      <div className="flex justify-between mb-4">
        <span>Tax:</span>
        <span className="text-primary font-bold">$2</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Total Amount:</span>
        <span className="text-primary font-bold">${totalAmount}</span>
      </div>

      <DropIn
        options={{ authorization: clientToken }}
        onInstance={setInstance}
      />

      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-primary text-white w-full py-2 rounded mt-4 hover:bg-primary/90 transition"
      >
        {loading ? "Processing..." : "Proceed to Checkout"}
      </button>
    </div>
  );
};

export default CartSummary;
