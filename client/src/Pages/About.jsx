import Layout from "../Components/Layout";
import { Users, Star, ShoppingBag, Trophy } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "5000+", label: "Active Customers" },
    { icon: Star, value: "4.9/5", label: "Customer Rating" },
    { icon: ShoppingBag, value: "10k+", label: "Products Sold" },
    { icon: Trophy, value: "15+", label: "Years Experience" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="mb-8 lg:mb-0">
                <h1 className="text-4xl font-bold text-white mb-6">
                  About <span className="text-blue-400">SwiftBuy</span>
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  We're dedicated to providing the best shopping experience for our customers. 
                  With a wide range of products and exceptional service, we strive to exceed 
                  your expectations every time.
                </p>
                <a href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                  Contact Us
                </a>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556740758-90de374c12ad"
                  alt="Our Store"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-lg mb-4">
                    <stat.icon size={24} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12">
              <div className="mb-8 lg:mb-0">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  To provide our customers with the highest quality products at competitive 
                  prices while delivering exceptional customer service. We believe in building 
                  long-lasting relationships with our customers and suppliers.
                </p>
                <ul className="space-y-4">
                  {[
                    "Quality Products",
                    "Competitive Prices",
                    "Fast Delivery",
                    "24/7 Customer Support"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
                <div className="grid gap-6">
                  {[
                    {
                      title: "Premium Quality",
                      description: "We source only the best products from trusted suppliers."
                    },
                    {
                      title: "Fast Shipping",
                      description: "Quick and reliable delivery to your doorstep."
                    },
                    {
                      title: "Secure Payment",
                      description: "Your transactions are protected with advanced encryption."
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;