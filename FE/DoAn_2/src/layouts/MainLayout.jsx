import Footer from "../components/footer/Footer";
import Navbar from "../components/navHome/Navbar";

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar/>
      {children}
      <Footer/>
    </div>
  );
}
