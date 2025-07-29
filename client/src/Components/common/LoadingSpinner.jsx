import { Loader } from "lucide-react";

const LoadingSpinner = ({ loadingText = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px]">
    <Loader className="w-12 h-12 animate-spin text-blue-600" />
    <p className="mt-4 text-gray-600">{loadingText}</p>
  </div>
);

export default LoadingSpinner;