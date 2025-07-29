import Layout from "../Components/Layout";
import { Shield, Lock, Eye, Database } from "lucide-react";

const Policy = () => {
  const sections = [
    {
      icon: Shield,
      title: "Security",
      content: "We are committed to ensuring that your information is secure. We have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online."
    },
    {
      icon: Lock,
      title: "Privacy Protection",
      content: "Your privacy is important to us. We only collect and use your personal information for specific, identified purposes related to our services."
    },
    {
      icon: Eye,
      title: "Transparency",
      content: "We believe in being transparent about our data practices. You can always request information about what data we hold about you."
    },
    {
      icon: Database,
      title: "Data Control",
      content: "You have control over your data. You can request to view, update, or delete your personal information at any time."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Your privacy is important to us. This policy outlines how we collect,
              use, and protect your personal information.
            </p>
          </div>
        </div>

        {/* Key Points */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sections.map((section, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <section.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
                <p className="text-gray-600">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Detailed Policy */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-8">
                <li>Name and contact information</li>
                <li>Account credentials</li>
                <li>Payment information</li>
                <li>Communication preferences</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use the collected information for various purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-8">
                <li>To provide and maintain our services</li>
                <li>To notify you about changes to our services</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our services</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-600 mb-4">
                You have several rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-8">
                <li>The right to access your personal data</li>
                <li>The right to rectification of your personal data</li>
                <li>The right to erasure of your personal data</li>
                <li>The right to restrict processing of your personal data</li>
              </ul>

              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Contact Us</h3>
                <p className="text-blue-800">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:privacy@mycompany.com" className="text-blue-600 hover:underline">
                    privacy@mycompany.com
                  </a>
                </p>
              </div>

              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;