import { useEffect } from "react";
import Layout from "../Components/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/authContext";
import CartItem from "../Components/Cart/CartItem";
import CartSummary from "../Components/Cart/CartSummary";
import Breadcrumbs from "../Components/Breadcrumbs";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (pid, qty) => {
    const updatedCart = cart.map((item) =>
      item._id === pid ? { ...item, quantity: qty, cartQuantity: qty } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.cartQuantity,
    0
  );
  const totalAmount = subtotalAmount + (cart.length > 0 ? 2 : 0);

  useEffect(() => {
    const enriched = cart.map((item) => ({
      ...item,
      quantity: item.cartQuantity || 1,
    }));
    setCart(enriched);
  }, []);

  return (
    <Layout>
      <Breadcrumbs items={[{ name: "Home" }, { name: "Cart", active: true }]} />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            {`Hello ${auth?.user?.name || "Guest"}`}
          </h1>
          <p className="text-gray-600">
            {cart.length
              ? `You have ${cart.length} item${
                  cart.length > 1 ? "s" : ""
                } in your cart.`
              : "Your cart is empty."}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/4 space-y-4">
            {cart.map((product) => (
              <CartItem
                key={product._id}
                product={product}
                onRemove={removeCartItem}
                onUpdateQty={updateQuantity}
              />
            ))}
          </div>

          <div className="lg:w-1/4">
            <CartSummary cart={cart} totalAmount={totalAmount} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
