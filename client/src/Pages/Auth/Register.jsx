import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout";
import axiosInstance from "../../utils/axiosInstance";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`/v1/auth/register`, {
        name,
        email,
        password,
        address,
        phone,
        answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              background: "#f3f4f6",
              height: "85vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="bg-gray-100 p-8 rounded-md shadow-xl w-96">
              <div className="border-b-2 border-gray-500">
                <h1 className="text-2xl font-bold mb-2  text-center">
                  Register
                </h1>
              </div>
              <div className="flex flex-col gap-4 m-2">
                <input
                  className="w-full bg-gray-100 outline-none p-2 border-b-2 border-gray-500"
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <input
                  className="w-full bg-gray-100 outline-none p-2 border-b-2 border-gray-500"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  className="w-full bg-gray-100 outline-none p-2 border-b-2 border-gray-500"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <input
                  className="w-full bg-gray-100 outline-none p-2 border-b-2 border-gray-500"
                  type="text"
                  placeholder="Address"
                  required
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                <input
                  className="w-full bg-gray-100 outline-none p-2 border-b-2 border-gray-500"
                  type="text"
                  placeholder="Phone"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <input
                  className="w-full bg-gray-100 outline-none p-2 border-b-2 border-gray-500"
                  type="text"
                  placeholder="What is your favorite sports?"
                  required
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                className="bg-slate-100 w-full p-2 m-2 text-lg rounded-full font-semibold border-2 border-solid border-gray-500 mx-auto hover:bg-slate-200"
              >
                Sign Up
              </button>
              <p className="mt-2 text-gray-600 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default Register;
