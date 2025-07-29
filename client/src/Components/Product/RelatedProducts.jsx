import ProductCard from "../Home/ProductCard";

const RelatedProducts = ({ products, cart, setCart }) => {
  return (
    <div className="lg:w-1/3">
      <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Related Products</h2>
        {products?.length ? (
          <>
            <p className="text-gray-600 text-sm mb-4">You might also like these</p>
            <div className="space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} cart={cart} setCart={setCart} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-sm">No related products found for this product.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
