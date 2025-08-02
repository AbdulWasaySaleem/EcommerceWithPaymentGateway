import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import Layout from "../../Components/Layout";
import { useAuth } from "../../context/authContext";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`/v1/auth/login`, {
        email,
        password,
      });
      if (res.data.success) {
        toast.success("Login successful");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const loginAsDemoAdmin = () => {
    setEmail("demoadmin@gmail.com");
    setPassword("123456789");
  };

  return (
    <Layout>
      <div className="min-h-[85vh] flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
        >
          <div className="text-center border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-800">Login</h2>
            <p className="text-sm text-gray-500">Access your account</p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-semibold transition"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="w-full text-sm text-blue-500 text-center hover:underline"
          >
            Forgot Password?
          </button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </div>

          {/* 🚀 Quick Login Buttons */}
          <div className="mt-6">
            <p className="text-center text-gray-500 mb-2">Quick login:</p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={loginAsDemoAdmin}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium"
              >
                Login as Demo Admin
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
