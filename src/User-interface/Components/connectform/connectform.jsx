import './connectform.scss'
import { useEffect , useState } from "react";
import useChngtext from "../../../hooks/UseChngtext";
import i18n from "../../../Helper/i18n";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdAttachEmail, MdLocationPin } from "react-icons/md";

export default function ConnectForm() {
  const { text } = useChngtext();
    const lang = i18n.language;
    const [company, setCompany] = useState(null);
  useEffect(() => {
      fetch(`http://localhost:5000/api/translations/${lang}/company`)
        .then((res) => res.json())
        .then((data) => {
          setCompany(data);
        })
        .catch((err) => console.log(err));
    }, [lang]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
   const handleSubmit = (e) => {
     e.preventDefault();

     const validationErrors = {};
     if (!name.trim()) validationErrors.name = `${text.Namerequired}`;
     if (!email.trim()) validationErrors.email = `${text.Emailrequired}`;
     else if (!/\S+@\S+\.\S+/.test(email))
       validationErrors.email = `${text.Invalidemail}`;
     if (!message.trim()) validationErrors.message = `${text.Messagerequired}`;

     if (Object.keys(validationErrors).length > 0) {
       setErrors(validationErrors);
       return; 
     }


     setName("");
     setEmail("");
     setMessage("");
     setErrors({});
   };
    if (!company) return <div>"Run ( node server.js )"</div>;
  return (
    <>
      <h1>{text.conectus}</h1>
      <div className="conectus">
        <div className="conectus-info">
          <div className="conectus-pho-adres-ema">
            <a
              href={`https://www.google.com/maps?q=${company.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdLocationPin className="conectus-info-icon" />
              {company.address}
            </a>
            <a href={company.phone} target="_blank" rel="noopener noreferrer">
              <BsFillTelephoneFill className="conectus-info-icon" />

              {company.phone}
            </a>
            <a href={company.email}>
              <MdAttachEmail className="conectus-info-icon" />
              {company.email}
            </a>
          </div>

          <div className="conectus-social">
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href={company.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href={company.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareXTwitter />
            </a>
          </div>
        </div>
        <div className="conectusform">
          {errors.name && <p className="error">{errors.name}</p>}

          <form onSubmit={handleSubmit} className="conectusform">
            <input
              type="text"
              placeholder={text.YourName}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder={text.Youremail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <textarea
              placeholder={text.YourMessage}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="button-web" type="submit">
              {text.Send}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
