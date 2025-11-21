import Navbar from "../Components/navbar/navbar";
import Slider from "../Components/Slider/Slider";
import BrandsNav from "../Components/brandsNav/brandsNav";
import { Outlet } from "react-router-dom";
import Footer from "../Components/footer/footer";

export default function Landingpage() {
  return (
    <>
      <Navbar />
      
        <Slider />
    
      <div id="main-outlet">
      <BrandsNav />
      </div >
      <Outlet />

      <Footer />
    </>
  );
}
