import LoadingSpinner from "../common/LoadingSpinner";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, total, loading, setPage, cart, setCart }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((prod, index) => (
        <ProductCard key={index} product={prod} cart={cart} setCart={setCart} />
      ))}
    </div>

    {products.length < total && (
      <div className="text-center mt-8 mb-4">
        {loading ? (
          <LoadingSpinner loadingText="Loading more products..." />
        ) : (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Load More
          </button>
        )}
      </div>
    )}
  </>
);

export default ProductGrid;
