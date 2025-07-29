import { useEffect, useMemo, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cart";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  Calculator,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { formatCurrency } from "./formatecurrency";

const CartSummary = ({ cart, subtotalAmount, isUpdating }) => {
  const [auth] = useAuth();
  const { setCart } = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(false);
  const navigate = useNavigate();

  const shippingCost = useMemo(() => (cart.length > 0 ? 20 : 0), [cart.length]);
  const tax = useMemo(() => subtotalAmount * 0.05, [subtotalAmount]);
  const finalAmount = useMemo(
    () => subtotalAmount + shippingCost + tax,
    [subtotalAmount, shippingCost, tax]
  );

  const itemsCount = useMemo(
    () => cart.reduce((acc, item) => acc + (item.cartQuantity || 1), 0),
    [cart]
  );

  useEffect(() => {
    if (!auth?.token) return;

    const fetchClientToken = async () => {
      setTokenLoading(true);
      try {
        const { data } = await axiosInstance.get("/v1/product/braintree/token");
        setClientToken(data.clientToken);
      } catch (err) {
        console.error("Error fetching Braintree token:", err);
        toast.error("Payment system unavailable");
      } finally {
        setTokenLoading(false);
      }
    };

    fetchClientToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    if (!instance) {
      toast.error("Payment system not ready");
      return;
    }

    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();

      const { data } = await axiosInstance.post(
        "/v1/product/braintree/payment",
        {
          nonce,
          cart,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      toast.success("🎉 Payment successful! Redirecting to orders...");
      localStorage.removeItem("cart");
      setCart([]);

      // Add a small delay for better UX
      setTimeout(() => {
        navigate("/dashboard/user/orders");
      }, 1500);
    } catch (err) {
      console.error("Payment Error:", err.response || err.message);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!clientToken && tokenLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          Order Summary
        </h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Items Summary */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Items ({itemsCount})</span>
            <span className="font-medium">
              {formatCurrency(subtotalAmount)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-1">
              <Truck className="w-4 h-4" />
              Shipping & Handling
            </span>
            <span className="font-medium">
              {shippingCost > 0 ? formatCurrency(shippingCost) : "Free"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax (5%)</span>
            <span className="font-medium">{formatCurrency(tax)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Amount</span>
            <span className="text-blue-600">{formatCurrency(finalAmount)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="border-t pt-4">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payment Method
          </h3>

          {!auth?.token ? (
            <p className="text-sm text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-3 flex items-center gap-2">
              ⚠️ Please{" "}
              <Link to="/login" className="underline font-semibold">
                log in
              </Link>{" "}
              to proceed with checkout.
            </p>
          ) : tokenLoading ? (
            <p className="text-gray-500">Loading payment options...</p>
          ) : clientToken ? (
            <div
              className={`transition-all duration-300 ${
                isUpdating ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <DropIn
                options={{
                  authorization: clientToken,
                  card: {
                    overrides: {
                      styles: {
                        input: {
                          "font-size": "14px",
                          color: "#333",
                        },
                      },
                    },
                  },
                }}
                onInstance={setInstance}
              />
            </div>
          ) : (
            <p className="text-red-500">Unable to load payment system.</p>
          )}
        </div>

        {/* Security Features */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock className="w-4 h-4 text-green-600" />
            <span>SSL encrypted secure checkout</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Money-back guarantee</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handlePayment}
          disabled={loading || isUpdating || !instance || !auth?.token}
          className={`w-full py-4 rounded-lg font-medium text-white transition-all duration-300 ${
            loading || isUpdating || !instance || !auth?.token
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing Payment...
            </div>
          ) : auth?.token ? (
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-5 h-5" />
              Secure Checkout • {formatCurrency(finalAmount)}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-5 h-5" />
              Please log in to checkout
            </div>
          )}
        </button>

        {/* Payment Info */}
        <div className="text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3" />
            You will be charged {formatCurrency(finalAmount)} for this order
          </p>
        </div>

        {/* Trust Badges */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-6 h-6 text-green-600" />
              <span className="text-xs text-gray-600">Secure</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-6 h-6 text-blue-600" />
              <span className="text-xs text-gray-600">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CheckCircle className="w-6 h-6 text-purple-600" />
              <span className="text-xs text-gray-600">Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
