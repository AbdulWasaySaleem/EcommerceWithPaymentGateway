import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/authContext";
import CartItem from "../Components/Cart/CartItem";
import CartSummary from "../Components/Cart/CartSummary";
import Breadcrumbs from "../Components/Breadcrumbs";
import { ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const removeCartItem = async (pid) => {
    setIsUpdating(true);
    try {
      // Add a small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));

      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
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
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } finally {
      setIsUpdating(false);
    }
  };

  const subtotalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.cartQuantity,
    0
  );
  const totalAmount = subtotalAmount + (cart.length > 0 ? 2 : 0);

  useEffect(() => {
    const initializeCart = async () => {
      setIsLoading(true);
      try {
        // Simulate loading for better UX
        await new Promise((resolve) => setTimeout(resolve, 500));

        const enriched = cart.map((item) => ({
          ...item,
          quantity: item.cartQuantity || 1,
        }));
        setCart(enriched);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCart();
  }, []);

  // Loading skeleton
  const CartSkeleton = () => (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 p-6 bg-white rounded-xl border">
          <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty cart component
  const EmptyCart = () => (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet. Start
          shopping to fill it up!
        </p>
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div>
            <Link
              to="/wishlist"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Heart className="w-4 h-4" />
              View Wishlist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs
              items={[{ name: "Home" }, { name: "Cart", active: true }]}
            />
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
              {cart.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {cart.reduce(
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
                <CartSkeleton />
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
          ) : cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="flex flex-col xl:flex-row gap-8">
              {/* Cart Items */}
              <div className="xl:w-2/3">
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="p-6 border-b bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Cart Items ({cart.length})
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {cart.map((product, index) => (
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
                        <CartItem
                          product={product}
                          onRemove={removeCartItem}
                          onUpdateQty={updateQuantity}
                          isUpdating={isUpdating}
                        />
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
                  <CartSummary
                    cart={cart}
                    totalAmount={totalAmount}
                    subtotalAmount={subtotalAmount}
                    isUpdating={isUpdating}
                  />
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
