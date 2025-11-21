import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./footer.scss";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdAttachEmail, MdLocationPin } from "react-icons/md";
import i18n from "../../../Helper/i18n";
import useChngtext from "../../../hooks/UseChngtext";
// import logo from "../../../assets/images/logo.png";

export default function Footer() {
  const { text } = useChngtext();

  const [company, setCompany] = useState(null);
  const lang = i18n.language;

  useEffect(() => {
    fetch(`http://localhost:5000/api/translations/${lang}/company`)
      .then((res) => res.json())
      .then((data) => {
        setCompany(data);
      })
      .catch((err) => console.log(err));
  }, [lang]);

  if (!company) return <div>"Run ( node server.js )"</div>;

  return (
    <div className="footer">
      <div className="footer-col">
        {/* <div className="footer-logo">
          <img src={logo} alt="" />
        </div> */}
        <div className="footer-about">
          <h4>{text.about}</h4>
          <p>{text.aboutus}</p>
        </div>
        <div className="footer-info">
          <h4>{text.connectus}</h4>
          <div className="pho-adres-ema">
            <a
              href={`https://www.google.com/maps?q=${company.address}`}
              target="_blank"
              rel="noopener noreferrer">
              <MdLocationPin className="icon" />
              {company.address}
            </a>
            <a href={company.phone} target="_blank" rel="noopener noreferrer">
              <BsFillTelephoneFill className="icon" />

              {company.phone}
            </a>
            <a href={company.email}>
              <MdAttachEmail className="icon" />
              {company.email}
            </a>
          </div>

          <div className="social">
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a
              href={company.social.instagram}
              target="_blank"
              rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a
              href={company.social.twitter}
              target="_blank"
              rel="noopener noreferrer">
              <FaSquareXTwitter />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <h4>{text.Menu}</h4>
          <div className="links-foot">
            <NavLink to={"/"}>{text.home}</NavLink>
            <NavLink to={"/Phones"}>{text.phones}</NavLink>
            <NavLink to={"/BestOffer"}>{text.bestOffer}</NavLink>
            <NavLink to={"/Aboutus"}>{text.about}</NavLink>
          </div>
        </div>
      </div>
      <a className="rights" href="/">
        <span>{text.rightsreserved}</span>
      </a>
    </div>
  );
}
