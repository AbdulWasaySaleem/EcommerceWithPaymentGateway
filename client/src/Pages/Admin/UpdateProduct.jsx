import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import getErrorMessage from "../../utils/getErrorMessage";

const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [product, setProduct] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/v1/product/getproduct/${params.slug}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setCategory(data.product.category._id);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping ? "1" : "0");
      setId(data.product._id);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong....");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axiosInstance.get("/v1/category/allcategory");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!..");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axiosInstance.put(
        `/v1/product/editproduct/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product Updated Successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error, "Error on product"));
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.prompt("Are you sure you want to delete?");
      if (!answer) return;

      const { data } = await axiosInstance.delete(`/v1/product/delete/${id}`);

      toast.success("Product Deleted!");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error, "Error on product"));
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className="container-fluid px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <AdminMenu />
          </div>

          {/* Form Section */}
          <div className="lg:w-3/4 bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-semibold mb-4">Update Product</h1>

            {/* Category Selector */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Category</label>
              <Select
                bordered
                placeholder="Select a category"
                size="large"
                className="w-full"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories.map((categ) => (
                  <Option key={categ._id} value={categ._id}>
                    {categ.name}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Side - Photo Upload */}
              <div>
                <label className="block font-medium mb-2">Product Image</label>
                <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded inline-block">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    hidden
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>

                <div className="mt-4">
                  {photo ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="preview"
                      className="w-full max-w-xs rounded shadow"
                    />
                  ) : (
                    <img
                      src={
                        photo ? URL.createObjectURL(photo) : product?.photo?.url
                      }
                      alt="product"
                      className="w-full max-w-xs rounded shadow"
                    />
                  )}
                </div>
              </div>

              {/* Right Side - Form Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    value={name}
                    className="w-full border rounded px-3 py-2"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    className="w-full border rounded px-3 py-2"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product Description"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Price</label>
                  <input
                    type="number"
                    value={price}
                    className="w-full border rounded px-3 py-2"
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Product Price"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    className="w-full border rounded px-3 py-2"
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Stock Quantity"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Shipping</label>
                  <Select
                    size="large"
                    className="w-full"
                    value={shipping}
                    onChange={(value) => setShipping(value)}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    onClick={handleUpdate}
                  >
                    Update Product
                  </button>
                  <button
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                    onClick={handleDelete}
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
