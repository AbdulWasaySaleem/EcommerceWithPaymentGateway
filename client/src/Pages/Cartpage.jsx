import { useEffect, useState, Suspense, lazy, useMemo } from "react";
import Layout from "../Components/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/authContext";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Components/common/LoadingSpinner";
import toast from "react-hot-toast";

const Cartskeleton = lazy(() => import("../Components/Cart/Cartskeleton"));
const EmptyCart = lazy(() => import("../Components/Cart/EmptyCart"));
const CartItem = lazy(() => import("../Components/Cart/CartItem"));
const CartSummary = lazy(() => import("../Components/Cart/CartSummary"));
const Breadcrumbs = lazy(() => import("../Components/Breadcrumbs"));

const CartPage = () => {
  const [auth] = useAuth();
  const { cart, setCart, isCartReady } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const safeCart = Array.isArray(cart) ? cart : [];

  const removeCartItem = async (pid) => {
    setIsUpdating(true);
    try {
      // Add a small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));

      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      toast.success("Item removed from cart!");
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } finally {
      setIsUpdating(false);
    }
  };

  const updateQuantity = async (pid, qty) => {
    if (qty < 1) return;

    setIsUpdating(true);
    try {
      // Add a small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 200));

      const updatedCart = cart.map((item) =>
        item._id === pid ? { ...item, quantity: qty, cartQuantity: qty } : item
      );
      setCart(updatedCart);
      toast.success("Cart updated successfully!");
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } finally {
      setIsUpdating(false);
    }
  };

  const subtotalAmount = useMemo(() => {
    return safeCart.reduce(
      (acc, item) => acc + item.price * (item.cartQuantity ?? 1),
      0
    );
  }, [safeCart]);

  const totalAmount = useMemo(
    () => subtotalAmount + (safeCart.length > 0 ? 2 : 0),
    [subtotalAmount, safeCart.length]
  );

  useEffect(() => {
    if (isCartReady) {
      setIsLoading(false);
    }
  }, [isCartReady]);

  if (!isCartReady) {
    return (
      <Layout>
        <div className="py-10 text-center">Loading cart...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto">
            <Suspense
              fallback={<LoadingSpinner loadingText="Loading cart..." />}
            >
              <Breadcrumbs
                items={[{ name: "Home" }, { name: "Cart", active: true }]}
              />
            </Suspense>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Header */}
          <div className="">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Shopping Cart
                </h1>
                <p className="text-gray-600 mt-1">
                  {auth?.user?.name
                    ? `Welcome back, ${auth.user.name}!`
                    : "Welcome, Guest!"}
                </p>
              </div>
              {safeCart.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {safeCart.reduce(
                      (total, item) => total + (item.cartQuantity || 1),
                      0
                    )}{" "}
                    items
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <Cartskeleton />
              </div>
              <div className="lg:w-1/3">
                <div className="animate-pulse bg-white rounded-xl p-6 border">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : safeCart.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="flex flex-col xl:flex-row gap-8">
              {/* Cart Items */}
              <div className="xl:w-2/3">
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="p-6 border-b bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Cart Items ({safeCart.length})
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {safeCart.map((product, index) => (
                      <div
                        key={product._id}
                        className={`transition-all duration-300 ${
                          isUpdating ? "opacity-50 pointer-events-none" : ""
                        }`}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: "fadeInUp 0.6s ease forwards",
                        }}
                      >
                        <Suspense
                          fallback={
                            <LoadingSpinner loadingText="Loading cart Items..." />
                          }
                        >
                          <CartItem
                            product={product}
                            onRemove={removeCartItem}
                            onUpdateQty={updateQuantity}
                            isUpdating={isUpdating}
                          />
                        </Suspense>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="xl:w-1/3">
                <div className="sticky top-8">
                  <Suspense
                    fallback={
                      <LoadingSpinner loadingText="Loading cart Items..." />
                    }
                  >
                    <CartSummary
                      cart={cart}
                      totalAmount={totalAmount}
                      subtotalAmount={subtotalAmount}
                      isUpdating={isUpdating}
                    />
                  </Suspense>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Layout>
  );
};

export default CartPage;
