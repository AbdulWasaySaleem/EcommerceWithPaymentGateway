// Components/Breadcrumbs.jsx
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = ({ items = [], showBack = true }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          {showBack && (
            <>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              <span>/</span>
            </>
          )}
          {items.map((item, idx) => (
            <span key={idx} className={item.active ? "text-gray-900 font-medium" : ""}>
              {item.name}
              {idx < items.length - 1 && <span className="mx-1">/</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
