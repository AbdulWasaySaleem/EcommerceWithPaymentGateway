import {
  ShoppingCart,
  Share2,
  Heart,
  Truck,
  Shield,
  RefreshCw,
  Minus,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import ImageGallery from "./ImageGallery";

const ProductInfo = ({ product, cart, setCart, quantity, setQuantity }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const addToCart = () => {
    const cartItem = { ...product, cartQuantity: quantity };
    const existingItem = cart.find((item) => item._id === product._id);

    const updatedCart = existingItem
      ? cart.map((item) =>
          item._id === product._id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        )
      : [...cart, cartItem];

    setCart(updatedCart);
    toast.success(`${quantity} item(s) added to cart`);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (type) => {
    if (type === "increase" && quantity < product.quantity) setQuantity(quantity + 1);
    if (type === "decrease" && quantity > 1) setQuantity(quantity - 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  console.log("Product:", product);

  return (
    <div className="lg:w-2/3 bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="lg:flex">
        {/* Image Section */}
        <ImageGallery photo={product.photo} name={product.name} />

        {/* Info Section */}
        <div className="lg:w-1/2 p-6 lg:p-8 space-y-6">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <button onClick={handleShare} className="text-gray-400 hover:text-gray-600">
              <Share2 />
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-3xl font-bold text-green-600">${product.price}</span>
            <p className="text-sm text-gray-500">Inclusive of all taxes</p>
          </div>

          <p className="text-sm text-gray-600">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
            <div>
              <span className="text-sm text-gray-500">Category</span>
              <p className="font-medium">{product?.category?.name}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Stock</span>
              <p
                className={`font-medium ${
                  product.quantity > 10 ? "text-green-600" : "text-orange-600"
                }`}
              >
                {product.quantity > 10
                  ? "In Stock"
                  : `Only ${product.quantity} left`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleQuantityChange("decrease")}
              disabled={quantity <= 1}
            >
              <Minus />
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increase")}
              disabled={quantity >= product.quantity}
            >
              <Plus />
            </button>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={addToCart}
              disabled={product.quantity === 0}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              <ShoppingCart className="inline-block mr-2" />
              Add to Cart
            </button>
            <button
              onClick={() => {
                setIsWishlisted(!isWishlisted);
                toast.success(
                  isWishlisted ? "Removed from wishlist" : "Added to wishlist"
                );
              }}
              className={`p-3 rounded-xl border-2 ${
                isWishlisted ? "border-red-500" : "border-gray-300"
              }`}
            >
              <Heart className={isWishlisted ? "text-red-500 fill-current" : ""} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Truck className="text-green-600" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <RefreshCw className="text-blue-600" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="text-purple-600" />
              <span>Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
