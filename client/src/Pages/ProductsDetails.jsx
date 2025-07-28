import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductInfo from "../Components/Product/ProductInfo";
import RelatedProducts from "../Components/Product/RelatedProducts";
import { useCart } from "../context/cart";
import axiosInstance from "../utils/axiosInstance";
import Layout from "../Components/Layout";
import { ArrowLeft } from "lucide-react";
import Breadcrumbs from "../Components/Breadcrumbs";

const ProductDetails = () => {
  const { slug } = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        `/v1/product/product-and-similar/${slug}`
      );
      setProduct(data.product);
      setRelatedProducts(data.similarProducts || []);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      toast.error("Failed to load product details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (slug) getProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: product?.category?.name },
            { name: product?.name, active: true },
          ]}
        />

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-8">
          <ProductInfo
            product={product}
            cart={cart}
            setCart={setCart}
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <RelatedProducts
            products={relatedProducts}
            cart={cart}
            setCart={setCart}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
