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
    <div>
      {" "}
      <button
        className={`btn-scroll-to-top ${isVisible ? "visible" : "hidden"}`}
        onClick={scrollToTop}
      >
        Scroll to Top
      </button>
    </div>
  );
};

export default Buttonscrollup;
