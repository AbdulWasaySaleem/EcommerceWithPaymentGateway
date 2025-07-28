import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousil = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="w-full max-w-7xl mx-auto rounded-xl overflow-hidden shadow-md mt-4">
      <div className="h-[260px] sm:h-[300px] md:h-[360px]">
        <Slider {...settings}>
          {[
            "https://icms-image.slatic.net/images/ims-web/87a71d56-52a7-4961-8318-4e930af6e78e.png",
            "https://icms-image.slatic.net/images/ims-web/4aa8ed81-6c4f-4e4c-8beb-e440a773ffb3.jpg",
            "https://icms-image.slatic.net/images/ims-web/b5def08d-e14d-4185-aa67-f72e99c995e9.jpg",
          ].map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousil;
