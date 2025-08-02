import { useEffect } from "react";
import { Monitor, Server, Star, Github } from "lucide-react";

const AboutModal = ({ onClose }) => {
  const FrontEnd = [
    "React",
    "Tailwind CSS",
    "Ant Design",
    "Lucide React",
    "Axios",
    "Context API",
    "Lucide-react",
    "Lodash",
    "Moment"
  ];
  const BackEnd = ["Node.js", "Express.js", "MongoDB"];
  const techStack = [
    "JWT Authentication",
    "Braintree Payments",
    "Cloudinary Uploads",
    "Multer",
    "Nodemailer",
    "Bcrypt",
    "Slugify"
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 md:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center pr-8">
          About This Project
        </h2>

        <p className="text-base text-gray-700 leading-relaxed mb-6 text-center">
          <strong>SwiftBuy 🛒</strong> is a modern full-stack e-commerce
          application built using the MERN stack. It features both user and
          admin functionality including product browsing, filtering, cart
          management, secure payments, and a robust admin dashboard for product
          and order management.
        </p>

        <div className="space-y-2">
          <Section
            color="blue"
            title="Frontend"
            items={FrontEnd}
            icon={<Monitor className="w-4 h-4" />}
          />
          <Section
            color="green"
            title="Backend"
            items={BackEnd}
            icon={<Server className="w-4 h-4" />}
          />
          <Section
            color="purple"
            title="Key Technologies"
            items={techStack}
            icon={<Star className="w-4 h-4" />}
          />
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          This project is developed for <strong>learning</strong> and{" "}
          <strong>practice</strong> purposes only.
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="https://github.com/AbdulWasaySaleem/EcommerceWithPaymentGateway"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 rounded-lg transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

const Section = ({ color, title, items, icon }) => {
  const colorClasses = {
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-500",
      textTitle: "text-blue-700",
      bgTag: "bg-blue-100",
      textTag: "text-blue-800",
    },
    green: {
      border: "border-green-500",
      bg: "bg-green-500",
      textTitle: "text-green-700",
      bgTag: "bg-green-100",
      textTag: "text-green-800",
    },
    purple: {
      border: "border-purple-500",
      bg: "bg-purple-500",
      textTitle: "text-purple-700",
      bgTag: "bg-purple-100",
      textTag: "text-purple-800",
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`bg-white border-l-4 ${colors.border} p-5 rounded-r-xl shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center text-white shadow-sm`}
        >
          {icon}
        </div>
        <h4 className={`font-semibold ${colors.textTitle} text-lg`}>{title}</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className={`px-3 py-1.5 ${colors.bgTag} ${colors.textTag} rounded-full text-sm font-medium shadow-sm`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AboutModal;
