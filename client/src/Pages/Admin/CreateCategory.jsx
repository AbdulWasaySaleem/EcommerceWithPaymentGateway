import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import { toast } from "react-hot-toast";
import { Modal } from "antd";
import { Plus, Edit2, Trash2, Tag } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import Breadcrumbs from "../../Components/Breadcrumbs";
import getErrorMessage from "../../utils/getErrorMessage";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [loading, setLoading] = useState(true);

  // Create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/v1/category/createcategory", {
        name,
      });
      console.log(data);
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategory();
      }
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error, "Error creating category"));
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/v1/category/allcategory");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.put(
        `/v1/category/updatecategory/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success("Category updated successfully");
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      }
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error, "Error creating category"));
    }
  };

  // Delete category
  const handleDelete = async (categoryId) => {
    try {
      const { data } = await axiosInstance.delete(
        `/v1/category/deletecategory/${categoryId}`
      );
      if (data.success) {
        toast.success("Category deleted successfully");
        getAllCategory();
      }
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error, "Error creating category"));
    }
  };

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
                items={[{ name: "Admin" }, { name: "Category", active: true }]}
              />
              {/* Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                <p className="text-gray-500 mt-1">
                  Manage your product categories
                </p>
              </div>

              {/* Create Category Form */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <form onSubmit={handleSubmit} className="flex gap-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter new category"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Add Category
                  </button>
                </form>
              </div>

              {/* Categories List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading categories...</p>
                  </div>
                ) : categories.length === 0 ? (
                  <div className="text-center py-12">
                    <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">No categories found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            #
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Slug
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {categories.map((category, index) => (
                          <tr key={category._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {category.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              /{category.slug}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setVisible(true);
                                    setUpdatedName(category.name);
                                    setSelected(category);
                                  }}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(category._id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Category"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <form onSubmit={handleUpdate} className="pt-4">
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default CreateCategory;
