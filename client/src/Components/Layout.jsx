import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import DevBanner from "./common/DevBanner";

const Layout = ({ children }) => {
  return (
    <>
      <Toaster />
      <div className="sticky top-0 z-50">
        <DevBanner />
        <Header />
      </div>
      <main style={{ minHeight: "79vh" }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
