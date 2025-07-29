import { useEffect, useState } from "react";
import AdminMenu from "../../Components/AdminMenu";
import Layout from "../../Components/Layout";
import { toast } from "react-hot-toast";
import ProductCard from "../../Components/Home/ProductCard";
import axiosInstance from "../../utils/axiosInstance";
import { Package } from "lucide-react";
import Breadcrumbs from "../../Components/Breadcrumbs";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Getting all products from backend
  const getallproducts = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/v1/product/getproduct");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Error while getting products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getallproducts();
  }, []);

  // Mock cart functions since we're in admin view
  const mockCart = [];
  const mockSetCart = () => {};

  console.log("products", products);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50/50">
        <div className="w-full px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-1/5">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="lg:w-4/5">
             <Breadcrumbs
                items={[{ name: "Admin" }, { name: "All-Products", active: true }]}
              />
              {/* Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Products
                    </h1>
                    <p className="text-gray-500 mt-1">
                      Manage your product catalog
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                    {products.length} Products
                  </span>
                </div>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-gray-500 mt-4">Loading products...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No products found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      cart={mockCart}
                      setCart={mockSetCart}
                      isAdmin={true} // Pass this prop to ProductCard
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
