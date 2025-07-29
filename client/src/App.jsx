import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTop from "./Components/common/ScrollToTop";

// Lazy loaded pages
const HomePage = lazy(() => import("./Pages/HomePage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Policy = lazy(() => import("./pages/Policy"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Register = lazy(() => import("./Pages/Auth/Register"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const ForgotPassword = lazy(() => import("./Pages/Auth/ForgotPassword"));
const Dashboard = lazy(() => import("./Pages/user/Dashboard"));
const Orders = lazy(() => import("./Pages/user/Orders"));
const Profiles = lazy(() => import("./Pages/user/Profiles"));
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const CreateCategory = lazy(() => import("./Pages/Admin/CreateCategory"));
const CreateProduct = lazy(() => import("./Pages/Admin/CreateProduct"));
const AdminProfile = lazy(() => import("./Pages/Admin/AdminProfile"));
const Products = lazy(() => import("./Pages/Admin/Products"));
const UpdateProduct = lazy(() => import("./Pages/Admin/UpdateProduct"));
const Cartpage = lazy(() => import("./Pages/Cartpage"));
const AdminOrders = lazy(() => import("./Pages/Admin/AdminOrders"));
const ProductDetails = lazy(() => import("./Pages/ProductsDetails"));

// Auth routes
import AdminRoute from "./Components/Routes/AdminRoute";
import Private from "./Components/Routes/Private";
import LoadingSpinner from "./Components/common/LoadingSpinner";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <ToastContainer
          position="bottom-right"
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product/:slug" element={<ProductDetails />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<Private />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/profiles" element={<Profiles />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/products/:slug" element={<UpdateProduct />} />
            <Route path="admin/profile" element={<AdminProfile />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>

          {/* Public Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
