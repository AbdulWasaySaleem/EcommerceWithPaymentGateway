import ProductCard from "./ProductCard";


const ProductGrid = ({ products, total, loading, setPage, cart, setCart }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((prod) => (
        <ProductCard key={prod._id} product={prod} cart={cart} setCart={setCart} />
      ))}
    </div>

    {products.length < total && (
      <div className="text-center mt-6">
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    )}
  </>
);

export default ProductGrid;
