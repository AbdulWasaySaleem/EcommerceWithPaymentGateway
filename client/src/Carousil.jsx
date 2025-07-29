// src/Components/Carousel.jsx

import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';
import img1 from '../src/assets/carousilImages/carousil1.webp';
import img2 from '../src/assets/carousilImages/carousil2.webp';
import img3 from '../src/assets/carousilImages/carousil3.webp';

const images = [img1, img2, img3];

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="w-full max-w-7xl mx-auto rounded-xl overflow-hidden shadow-md mt-4">
      <div className="overflow-hidden h-[180px] sm:h-[250px] md:h-[360px]" ref={emblaRef}>
        <div className="flex">
          {images.map((img, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 h-full flex items-center justify-center"
            >
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
