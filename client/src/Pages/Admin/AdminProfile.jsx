import React from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import { useAuth } from "../../context/authContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Edit,
  Calendar,
} from "lucide-react";
import moment from "moment";

const AdminProfile = () => {
  const [auth] = useAuth();

  const profileFields = [
    {
      label: "Personal Information",
      fields: [
        { label: "Name", value: auth.user.name, icon: User, color: "blue" },
        { label: "Email", value: auth.user.email, icon: Mail, color: "indigo" },
        {
          label: "Member Since",
          value: moment(auth.user.createdAt).format("MMMM YYYY"),
          icon: Calendar,
          color: "purple",
        },
      ],
    },
    {
      label: "Additional Details",
      fields: [
        {
          label: "Phone",
          value: auth.user.phone || "Not added",
          icon: Phone,
          color: "green",
        },
        {
          label: "Address",
          value: auth.user.address || "Not added",
          icon: MapPin,
          color: "rose",
        },
        {
          label: "Role",
          value: "Administrator",
          icon: Shield,
          color: "amber",
        },
      ],
    },
  ];

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
              {/* Profile Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                        <User size={28} />
                      </div>
                      <button className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full shadow-md border border-gray-100 hover:border-blue-500 transition-colors">
                        <Edit size={12} className="text-gray-500" />
                      </button>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {auth.user.name}
                      </h1>
                      <p className="text-gray-500">{auth.user.email}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mt-2">
                        <Shield size={14} className="mr-1" />
                        Administrator
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Sections Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profileFields.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full"
                  >
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        {section.label}
                      </h2>
                      <div className="space-y-4">
                        {section.fields.map((field, fieldIndex) => (
                          <div
                            key={fieldIndex}
                            className="flex items-center p-3 rounded-lg border border-gray-100 bg-white transition-transform hover:scale-[1.02] duration-200"
                          >
                            <div className="flex-shrink-0">
                              <div
                                className={`w-10 h-10 rounded-lg bg-${field.color}-50 flex items-center justify-center`}
                              >
                                <field.icon
                                  className={`w-5 h-5 text-${field.color}-500`}
                                />
                              </div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-500">
                                {field.label}
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {field.value}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;