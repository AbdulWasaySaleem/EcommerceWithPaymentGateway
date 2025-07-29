import { Trash2, Plus, Minus, Heart, Star, Package } from "lucide-react";
import { useState } from "react";

const CartItem = ({ product, onRemove, onUpdateQty, isUpdating }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [quantity, setQuantity] = useState(product.cartQuantity || 1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = product.photo?.url;

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove(product._id);
  };

  const handleQuantityChange = async (newQty) => {
    if (newQty < 1 || newQty > 99) return;
    setQuantity(newQty);
    await onUpdateQty(product._id, newQty);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div
      className={`p-6 transition-all duration-300 hover:bg-gray-50 ${
        isRemoving ? "opacity-50 scale-95" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-100">
            {!imageError && imageUrl ? (
              <>
                {!imageLoaded && (
                  <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <img
                  src={imageUrl}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Stock status indicator */}
          <div className="absolute -top-1 -right-1">
            <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
                {product.name}
              </h3>

              {product.description && (
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>
              )}

              {/* Product Category/Brand */}
              {product.category && (
                <p className="text-xs text-blue-600 font-medium mb-3">
                  {product.category.name || product.category}
                </p>
              )}
            </div>

            {/* Price and Actions */}
            <div className="flex sm:flex-col sm:items-end sm:justify-between gap-4 sm:gap-2">
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <div className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </div>
                  )}
                <div className="text-xs text-gray-600 mt-1">
                  Total: {formatPrice(product.price * quantity)}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                  <button
                    className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1 || isUpdating}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 99 || isUpdating}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
                    onClick={handleRemove}
                    disabled={isRemoving || isUpdating}
                    title="Remove from cart"
                  >
                    {isRemoving ? (
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
                    title="Move to wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Product Info */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                In Stock
              </span>
              <span>Free shipping on orders over $1000</span>
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
