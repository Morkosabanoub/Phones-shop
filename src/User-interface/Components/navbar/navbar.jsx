// Navbar.jsx
import { useState } from "react";
import "./navbar.scss";
import useBrands from "../../../hooks/useBrands.jsx";
import i18n from "../../../Helper/i18n.jsx";
import { NavLink, Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { MdArrowDropDown } from "react-icons/md";
import logo from "../../../assets/images/logo.png";
import { FaSearch, FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import "flag-icons/css/flag-icons.min.css";
import UseAuth from "../../../hooks/AuthContext.jsx";
import useChngtext from "../../../hooks/UseChngtext.jsx";
import useData from "../../../hooks/useData.jsx";
import { generateSlug, scrollToOutlet } from "../../../Helper/helpers.jsx";
import Usesearch from "../../../hooks/usesearch.jsx";


export default function Navbar() {
  const [openNavbar, setopenNavbar] = useState(false);
  const { user, setUser } = UseAuth();
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authData");
  };
  const { text } = useChngtext();
  const closeNav = () => setopenNavbar(false);
  const { brands } = useBrands();
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");
  const { search, handleSearch, setSearch, searchfound } = Usesearch("");

  const [openLang, setOpenLang] = useState(false);
  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    setOpenLang(false);
  };
  const endpoint = `http://localhost:5000/api/general/users`;
  const { dataList } = useData(endpoint);
  const navbar = [
    { to: "/Phones", text: text.phones },
    { to: "/BestOffer", text: text.bestOffer },
    { to: "/connectus", text: text.connectus },

  ];
  return (
    <div className="main-content">
      <div className="nav">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="navbar">
          <div
            className="openNavbar"
            onClick={() => setopenNavbar(!openNavbar)}
          >
            <TiThMenu className="mobile-menu-icon" />
          </div>

          <div className={`navlinks ${openNavbar ? "show-nav" : "hide-nav"}`}>
            {[
              { to: "/", text: text.home },
              {
                text: text.brands,
                dropdown: brands.map((brand) => ({
                  to: `/brand/${brand.name}`,
                  text: brand.name,
                })),
              },
              ...navbar,
            ].map((link, index) =>
              link.dropdown ? (
                <div key={index} className="dropnav">
                  <span className="dropnav-title">
                    {link.text}
                    <MdArrowDropDown className="arrowmenu" />
                  </span>
                  <div className="dropnav-content">
                    {link.dropdown.map((item, idx) => (
                      <NavLink
                        key={idx}
                        to={item.to}
                        onClick={() => {
                          closeNav();
                          scrollToOutlet();
                        }}
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={index}
                  to={link.to}
                  onClick={() => {
                    closeNav();
                    scrollToOutlet?.();
                  }}
                >
                  {link.text}
                </NavLink>
              )
            )}
          </div>
        </div>
        <div className="navsearch">
          <div className="search">
            <input
              type="search"
              value={search || ""}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch();
              }}
              placeholder={text.search}
            />
            <FaSearch onClick={handleSearch} className="search-icon" />
            <div className={"search-results"}>
              {search && (
                <ul>
                  {searchfound.map((b) => (
                    <li key={b.id} o>
                      <Link
                        to={`/phone/${generateSlug(b.name)}`}
                        onClick={() => {
                          scrollToOutlet();
                          setSearch("");
                        }}
                      >
                        {b.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="usernav">
        <div className="lang">
          <span className="currentlang" onClick={() => setOpenLang(!openLang)}>
            <span
              className={`fi fi-${
                currentLang === "ar" ? "eg" : currentLang === "ua" ? "ua" : "sh"
              }`}
            ></span>
          </span>
          {openLang && (
            <div className="droplang">
              <button type="submit" onClick={() => changeLang("en")}>
                <span className="fi fi-sh"></span>
              </button>
              <button type="submit" onClick={() => changeLang("ar")}>
                <span className="fi fi-eg"></span>
              </button>
              <button type="submit" onClick={() => changeLang("ua")}>
                <span className="fi fi-ua"></span>
              </button>
            </div>
          )}
        </div>
        {user && (
          <div className="cart-like">
            <Link to={"/Cart"} className="cart">
              <IoCart className="cart-icon" />
              <span className="cart-count">
                {user && dataList.length > 0
                  ? dataList.find((u) => u.Username === user.Username)?.cart
                      ?.length || 0
                  : 0}
              </span>
            </Link>
            <Link to={"/Like"} className="like">
              <FaHeart className="like-icon" />
              <span className="like-count">
                {user && dataList.length > 0
                  ? dataList.find((u) => u.Username === user.Username)?.liked
                      ?.length || 0
                  : 0}
              </span>
            </Link>
          </div>
        )}
        <div className="nav-left">
          {user && user.role === "admin" ? (
            <div className="user-info">
              <img
                src={user.avatar || "https://i.pravatar.cc/40"}
                alt="avatar"
              />
              <Link className="link" to="/Dashboard">
                {text.dashboard}
              </Link>
              <button onClick={logout}>{text.logout}</button>
            </div>
          ) : user ? (
            <div className="user-info">
              <img
                src={user.avatar || "https://i.pravatar.cc/40"}
                alt="avatar"
              />
              <button onClick={logout}>{text.logout}</button>
            </div>
          ) : (
            <div className="login">
              <NavLink
                to={"Login"}
                onClick={() => {
                  closeNav();
                  scrollToOutlet();
                }}
              >
                {text.login}
              </NavLink>
              <NavLink
                to={"Signup"}
                onClick={() => {
                  closeNav();
                  scrollToOutlet();
                }}
              >
                {text.signup}
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
