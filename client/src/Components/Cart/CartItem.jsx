import { Trash2 } from "lucide-react";

const CartItem = ({ product, onRemove }) => {
  const imageUrl = product.photo?.url;

  return (
    <div className="flex flex-col sm:flex-row gap-4 border-b py-4 items-start sm:items-center">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-24 h-24 object-cover rounded"
      />

      <div className="flex flex-1 flex-col sm:flex-row justify-between w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-sm text-gray-500 max-w-md line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-6 mt-4 sm:mt-0">
          <span className="text-primary font-bold text-lg">
            Rs {product.price}
          </span>
          <button
            className="text-red-600 hover:text-red-800 transition"
            onClick={() => onRemove(product._id)}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
