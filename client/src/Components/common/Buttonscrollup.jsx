import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const Buttonscrollup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsVisible(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full flex justify-center mt-8">
      <button
        onClick={scrollToTop}
        className={`btn-scroll-to-top ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 mb-2`}
      >
        <ArrowUp className="w-5 h-5" />
        Scroll to Top
      </button>
    </div>
  );
};

export default Buttonscrollup;
