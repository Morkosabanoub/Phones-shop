import "./SideBashnav.scss";
import { NavLink, useNavigate } from "react-router-dom";
import UseAuth from "../../../hooks/AuthContext";
import useChngtext from "../../../hooks/UseChngtext";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";
import { useState } from "react";

export default function SideDashnan() {
  const { text } = useChngtext();
  const { logout } = UseAuth();
  const navigate = useNavigate();
  const [openNavbar, setopenNavbar] = useState(false);
  const closeNav = () => setopenNavbar(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("authData");
    navigate("/");
  };

  const navbar = [
    { to: "home", icon: "fa-solid fa-house", text: text.home },
    { to: "/Dashboard/Slider", icon: "fa-solid fa-box", text: text.slider },
    { to: "/Dashboard/Brands", icon: "fa-solid fa-box", text: text.brands },
    { to: "/Dashboard/Phone", icon: "fa-solid fa-box", text: text.phone },
    { to: "/Dashboard/Services", icon: "fa-solid fa-box", text: text.services },
  ];

  return (
    <div>
      <div
        className="dashopenNavbar"
        onClick={() => setopenNavbar(!openNavbar)}
      >
        <TiThMenu className="mobile-menu-icon" />
      </div>

      <div className={`dashnave ${openNavbar ? "show-nav" : ""}`}>
        <h1>{text.dashbord}</h1>
        <img src={"https://i.pravatar.cc/40"} alt="avatar" />

        <div className="dashnavelinks">
          {navbar.map((b, index) => (
            <NavLink key={index} to={b.to} onClick={closeNav}>
              <i className={b.icon} />
              <span>{b.text}</span>
            </NavLink>
          ))}
        </div>

        <div className="navbutoons">
          <NavLink to="/Dashboard/profile" onClick={closeNav}>
            <CgProfile />
            <span>profile</span>
          </NavLink>
          <button className="logout" onClick={(handleLogout)}>
            <RiLogoutCircleLine className="logouticon" />
            {text.logout}
          </button>
        </div>
      </div>
    </div>
  );
}
