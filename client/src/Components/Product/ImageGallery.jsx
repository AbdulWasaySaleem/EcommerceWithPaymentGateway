import { useState } from "react";

const ImageGallery = ({ photo, name }) => {
  const images = photo?.url ? [photo] : [];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="lg:w-1/2 p-6 space-y-4">
      <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={images[selectedImageIndex]?.url}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>

      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImageIndex(i)}
              className={`w-20 h-20 rounded border-2 ${
                selectedImageIndex === i
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
            >
              <img
                src={img.url}
                className="w-full h-full object-cover"
                alt=""
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
