import { useEffect, useState } from "react";
import axios from "axios";
import Carousil from "../Carousil";
import Layout from "../Components/Layout";
import TopBar from "../Components/Home/TopBar";
import ProductGrid from "../Components/Home/ProductGrid";
import FiltersDrawer from "../Components/Home/FilterDrawer";
import Buttonscrollup from "./Buttonscrollup";
import axiosInstance from "../utils/axiosInstance";

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

  // Load categories
  const getAllCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/v1/category/allcategory");
      setCategories(data?.category || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Load products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/v1/product/productlist/${page}`
      );
      setProducts((prev) => [...prev, ...data.products]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axiosInstance.get("/v1/product/productcount");
      setTotal(data?.total);
    } catch (err) {
      console.error(err);
    }
  };

  // Load filtered products
  const loadFilteredProducts = async () => {
    try {
      const { data } = await axiosInstance.post("/v1/product/productfilter", {
        checked,
        radio,
      });
      setProducts(data?.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    setFilterOpen(false);
    setPage(1);
    getAllProducts();
  };

  // Initial loads
  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) {
      loadFilteredProducts();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  useEffect(() => {
    if (page > 1 && !checked.length && !radio.length) {
      getAllProducts();
    }
  }, [page]);

  return (
    <Layout>
      <Carousil />

      <div className="container mx-auto px-4 py-6">
        <TopBar onFilterClick={() => setFilterOpen(true)} />

        <ProductGrid
          products={products}
          total={total}
          loading={loading}
          setPage={setPage}
          cart={cart}
          setCart={setCart}
        />
      </div>

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

      <Buttonscrollup />
    </Layout>
  );
};

export default HomePage;
