import UseAuth from "../hooks//AuthContext";
import Home from "../User-interface/pages/Home";
import Phonespage from "../User-interface/pages/Phonespage";
import Landingpage from "../User-interface/pages/Landingpage";
import Bestofferpage from "../User-interface/pages/bestofferpage";
import BrandPage from "../User-interface/pages/Brandspages";
import PhoneInfopage from "../User-interface/pages/phoneInfopage";
import Login from "../User-interface/Components/Login-Signup/Login";
import Signup from "../User-interface/Components/Login-Signup/Signup";
import LandingDash from "../Dashboard/pages/LandingDash";
import Dashhome from "../Dashboard/pages/Dashhome";
import Dashbrand from "../Dashboard/components/Dashedit/Dash-brands";
import DashPhone from "../Dashboard/components/Dashedit/DashPhone";
import DashSlider from "../Dashboard/components/Dashedit/DashSlider";
import DashServices from "../Dashboard/components/Dashedit/DashServices";
import DashProfile from "../Dashboard/components/Dashedit/DashProfile";
import ConnectUs from "../User-interface/pages/connectus";
import Like from "../User-interface/Components/like";
import Cart from "../User-interface/Components/cart";
import PageNotFound from "../404/404";

export default function routes() {
  const { user } = UseAuth();

  if (user && user.role === "admin") {
    return [
      {
        path: "/",
        element: <Landingpage />,
        children: [
          { index: true, element: <Home /> },
          { path: "brand/:brandName", element: <BrandPage /> },
          { path: "BestOffer", element: <Bestofferpage /> },
          { path: "Phones", element: <Phonespage /> },
          { path: "Phone/:name", element: <PhoneInfopage /> },
          { path: "connectus", element: <ConnectUs /> },
          { path: "Like", element: <Like /> },
          { path: "Cart", element: <Cart /> },
        ],
      },
      {
        path: "/Dashboard",
        element: <LandingDash />,
        children: [
          { index: true, element: <Dashbrand /> },
          { path: "home", element: <Dashhome /> },
          { path: "Brands", element: <Dashbrand /> },
          { path: "Phone", element: <DashPhone /> },
          { path: "Slider", element: <DashSlider /> },
          { path: "Services", element: <DashServices /> },
          { path: "Profile", element: <DashProfile /> },
          { path: "*", element: <PageNotFound /> },
        ],
      },
    ];
  } else if (user && user.role === "user") {
    return [
      {
        path: "/",
        element: <Landingpage />,
        children: [
          { index: true, element: <Home /> },
          { path: "brand/:brandName", element: <BrandPage /> },
          { path: "BestOffer", element: <Bestofferpage /> },
          { path: "Phones", element: <Phonespage /> },
          { path: "Phone/:name", element: <PhoneInfopage /> },
          { path: "connectus", element: <ConnectUs /> },
          { path: "Login", element: <Login /> },
          { path: "Signup", element: <Signup /> },
          { path: "*", element: <PageNotFound /> },
          { path: "Like", element: <Like /> },
          { path: "Cart", element: <Cart /> },
        ],
      },
    ];
  } else {
    return [
      {
        path: "/",
        element: <Landingpage />,
        children: [
          { index: true, element: <Home /> },
          { path: "brand/:brandName", element: <BrandPage /> },
          { path: "BestOffer", element: <Bestofferpage /> },
          { path: "Phones", element: <Phonespage /> },
          { path: "Phone/:name", element: <PhoneInfopage /> },
          { path: "connectus", element: <ConnectUs /> },
          { path: "Login", element: <Login /> },
          { path: "Signup", element: <Signup /> },
          { path: "*", element: <PageNotFound /> },
        ],
      },
    ];
  }
}
