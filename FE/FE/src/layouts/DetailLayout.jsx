// src/layout/DetailLayout.jsx
import Banner from "../components/containerDetail/Banner";
import FooterDetail from "../components/footer/FooterDetail";
import Navbar from "../components/navDetail/Navbar";

export default function DetailLayout({ topic }) {
  return (
    <div>
      <Navbar />
      <Banner topic={topic} />
      <FooterDetail />
    </div>
  );
}
