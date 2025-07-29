import { useEffect, useState, Suspense, lazy, useCallback } from "react";
import { debounce } from "lodash";
import TopBar from "../Components/Home/TopBar";
import Layout from "../Components/Layout";
import axiosInstance from "../utils/axiosInstance";
import Buttonscrollup from "../Components/common/Buttonscrollup";
import LoadingSpinner from "../Components/common/LoadingSpinner";

const Carousil = lazy(() => import("../Carousil"));
const FiltersDrawer = lazy(() => import("../Components/Home/FilterDrawer"));
const ProductGrid = lazy(() => import("../Components/Home/ProductGrid"));

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  // Load categories and productCount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, totalData] = await Promise.all([
          axiosInstance.get("/v1/category/allcategory"),
          axiosInstance.get("/v1/product/productcount"),
        ]);
        setCategories(categoriesData?.data?.category || []);
        setTotal(totalData?.data?.total);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Load products
  const getAllProducts = async (pageNum = 1, replace = false) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/v1/product/productlist/${pageNum}`
      );
      console.log("data", data);
      setProducts((prev) =>
        replace || pageNum === 1 ? data.products : [...prev, ...data.products]
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  // Get total count

  // Load filtered products
  const loadFilteredProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/v1/product/productfilter", {
        checked,
        radio,
      });
      setProducts(data?.products || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  // Reset filters
  const resetFilters = useCallback(() => {
    setChecked([]);
    setRadio([]);
    setPage(1);
    setFilterOpen(false);
  }, []);

  // Handle filter changes
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      if (checked.length || radio.length) {
        loadFilteredProducts();
        setPage(1);
      } else {
        setPage(1);
        getAllProducts(1, true);
      }
    }, 300); // 300ms delay

    debouncedFilter();

    return () => {
      debouncedFilter.cancel();
    };
  }, [checked, radio]);

  // Handle pagination (only when no filters are active)
  useEffect(() => {
    if (page > 1 && !checked.length && !radio.length) {
      getAllProducts(page, false); // Append to existing products
    }
  }, [page]);

  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner loadingText="Loading Carousil..." />}>
        <Carousil />
      </Suspense>

      <div className="container mx-auto px-4 py-6">
        <TopBar onFilterClick={() => setFilterOpen(true)} />

        {loading && products.length === 0 ? (
          <LoadingSpinner loadingText="Loading products..." />
        ) : (
          <Suspense
            fallback={<LoadingSpinner loadingText="Loading products..." />}
          >
            <ProductGrid
              products={products}
              total={total}
              loading={loading}
              setPage={setPage}
              cart={cart}
              setCart={setCart}
            />
          </Suspense>
        )}
      </div>

      <Suspense fallback={<LoadingSpinner loadingText="Loading Filters..." />}>
        <FiltersDrawer
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          categories={categories}
          checked={checked}
          radio={radio}
          setChecked={setChecked}
          setRadio={setRadio}
          resetFilters={resetFilters}
        />
      </Suspense>

      <Buttonscrollup />
    </Layout>
  );
};

export default HomePage;
