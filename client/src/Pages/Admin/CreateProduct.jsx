import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  // get all categories || from category route
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/allcategory"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!..");
    }
  };

  console.log(categories);

  // creating product || btn
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/createproduct",
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully!");
        navigate("/");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!..");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div
            className="col-md-9"
            style={{
              background: "#f3f4f6",
              height: "85vh",
            }}
          >
            <div className="p-4 ">
              <h1 className="text-2xl font-bold mb-3 mt-2">Create Product</h1>
              {/* Search with all category from DB */}
              <div className="p-4 border-4">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories.map((categ) => (
                    <Option key={categ._id} value={categ._id}>
                      {categ.name}
                    </Option>
                  ))}
                </Select>

                <div className="flex items-center justify-center border-2 ">
                  <div className=" flex w-full h-full">
                    <div className="w-1/2 p-4 bg-white m-4 border-dashed border-2 border-slate-400 ">
                      <label className="btn btn-primary flex items-center justify-center ">
                        {photo ? photo.name : "Upload Photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={(e) => {
                            setPhoto(e.target.files[0]);
                          }}
                          hidden
                          
                        />
                      </label>

                      <div className="mt-4">
                        {photo && (
                          <div className="text-center ">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt="photo"
                              className="img img-responsive"
                              style={{
                                maxHeight: "200px",
                                maxWidth: "100%",
                                display: "inline-block",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="w-1/2 p-4 border-l-4">
                      <div className="mb-3">
                        <input
                          type="text"
                          value={name}
                          placeholder="Write Name of Product"
                          className="form-control"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <textarea
                          rows={4}
                          value={description}
                          placeholder="Write description of Product"
                          className="w-full rounded-md p-2"
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <input
                          type="number"
                          value={price}
                          placeholder="Write Price of Product(100-200)"
                          className="form-control"
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <input
                          type="number"
                          value={quantity}
                          placeholder="Write Quantity of Product(10-20)"
                          className="form-control"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <Select
                          placeholder="Set Shipping"
                          size="large"
                          showSearch
                          className="form-select mb-3"
                          bordered={false}
                          onChange={(value) => {
                            setShipping(value);
                          }}
                        >
                          <Option value="0">No</Option>
                          <Option value="1">Yes</Option>
                        </Select>
                      </div>

                      <div className="mb-3">
                        <button
                          className="btn btn-primary"
                          onClick={handleClick}
                        >
                          Create Product
                        </button>
                      </div>
                    </div>
                
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
