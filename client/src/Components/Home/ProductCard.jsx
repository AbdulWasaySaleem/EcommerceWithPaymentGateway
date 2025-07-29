import { Edit, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/cart";

const ProductCard = ({ product, isAdmin }) => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart(); // Use the cart context
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const existingCart = [...cart];
    const index = existingCart.findIndex((item) => item._id === product._id);

    if (index !== -1) {
      // Product already in cart: increase quantity
      existingCart[index].cartQuantity =
        (existingCart[index].cartQuantity || 1) + 1;
    } else {
      // New product: add with cartQuantity = 1
      existingCart.push({ ...product, cartQuantity: 1 });
    }

    setCart(existingCart); // Update context state
    localStorage.setItem("cart", JSON.stringify(existingCart)); // Also update localStorage
    toast.success("Added to cart");
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.slug}`);
  };

  // Add this function for admin actions
  const handleAdminAction = (e) => {
    e.stopPropagation();
    navigate(`/dashboard/admin/products/${product.slug}`);
  };

  const imageUrl = product?.photo?.url
    ? `${product.photo.url}?f_auto`
    : "/default-product.jpg";

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-1 overflow-hidden border border-gray-100 cursor-pointer "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewProduct}
    >
      {/* Image container */}
      <div className="relative w-full h-[180px] bg-gradient-to-br from-gray-50 to-gray-100 p-3">
        {/* Loading shimmer */}
        {!isImageLoaded && (
          <div className="absolute inset-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl" />
        )}

        <img
          src={imageUrl}
          alt={product.name}
          className={`object-contain w-full h-full transition-all duration-500 ease-out group-hover:scale-110 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />

        {/* Overlay View Button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 rounded-t-2xl bg-black/20 backdrop-blur-sm ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleViewProduct}
            className="bg-white/95 text-gray-800 font-semibold py-2 px-6 rounded-full shadow-xl transform transition-all duration-200 hover:scale-105 hover:bg-white border border-gray-200"
          >
            View Details
          </button>
        </div>

        {/* Floating gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Product name */}
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 line-clamp-2 leading-relaxed text-sm">
          {product.description}
        </p>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-bold text-green-600">
            {formatPrice(product.price)}
          </div>

          {isAdmin ? (
            <button
              onClick={handleAdminAction}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm flex items-center space-x-1"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm flex items-center space-x-1"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>

      {/* Subtle border animation */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200/50 transition-all duration-300 pointer-events-none" />

      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </div>
  );
};

export default ProductCard;
