import "./phonecard.scss";
import { Link } from "react-router-dom";
import { generateSlug } from "../../../Helper/helpers.jsx";
import useChngtext from "../../../hooks/UseChngtext";
import { FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import useData from "../../../hooks/useData.jsx";
import UseAuth from "../../../hooks/AuthContext.jsx";
import { useEffect, useState } from "react";

export default function PhoneCard({ phoneCard }) {
  const { text } = useChngtext();
  const endpoint = `http://localhost:5000/api/general/users`;
  const { dataList, loading, updatebyname } = useData(endpoint);
  const finalPrice = phoneCard.price - phoneCard.discount;
  const discountPercent = Math.round(
    (phoneCard.discount / phoneCard.price) * 100
  );
  const { user } = UseAuth();

  const [founduser, setFoundUser] = useState({
    Username: "",
    cart: [],
    liked: [],
  });

  useEffect(() => {
    if (user && dataList.length > 0) {
      const userinfo = dataList.find(
        (b) =>
          b.Username &&
          b.Username.toLowerCase().replace(/\s+/g, "") ===
            user.Username.toLowerCase().replace(/\s+/g, "")
      );
      if (userinfo) {
        setFoundUser({
          Username: userinfo.Username || "",
          cart: userinfo.cart || [],
          liked: userinfo.liked || [],
        });
      }
    }
  }, [user, dataList]);

  if (loading) return <p>loading</p>;

  const handleAddToCart = () => {
    const exists = founduser.cart?.some((item) => item.id === phoneCard.id);
    let updatedCart;

    if (exists) {
      updatedCart = founduser.cart.filter((item) => item.id !== phoneCard.id);
    } else {
      updatedCart = [...(founduser.cart || []), { id: phoneCard.id }];
    }

    const updatedUser = { ...founduser, cart: updatedCart };
    setFoundUser(updatedUser);

    updatebyname(updatedUser);
  };

  const handleAddToLike = () => {
    const exists = founduser.liked?.some((item) => item.id === phoneCard.id);
    let updatedCart;

    if (exists) {
      updatedCart = founduser.liked.filter((item) => item.id !== phoneCard.id);
    } else {
      updatedCart = [...(founduser.liked || []), { id: phoneCard.id }];
    }

    const updatedUser = { ...founduser, liked: updatedCart };
    setFoundUser(updatedUser);

    updatebyname(updatedUser);
  };

  return (
    <div className="phonecard" key={phoneCard.id}>
      <img
        className="phonecard-img"
        src={phoneCard.image}
        alt={phoneCard.name}
        loading="lazy"
      />

      <div className="phonecard-info">
        <span className="phonecard-name">{phoneCard.name}</span>

        <span
          className={`phonecard-price ${
            phoneCard.discount > 0 ? "redline" : ""
          }`}
        >
          {text.price} {phoneCard.price}
          {text.currency}
        </span>
        <span className="phonecard-fin-price">
          {text.price} {finalPrice} {text.currency}
        </span>
        <span className="phonecard-insta">
          {`installment: ${phoneCard.installment ? "yes" : "No"}`}
        </span>
      </div>

      <span
        className={`phonecard-discound ${
          phoneCard.discount > 0 ? "show" : "hide"
        }`}
      >
        {discountPercent} {text.Percentage}
      </span>

      <Link className="but-link" to={`/Phone/${generateSlug(phoneCard.name)}`}>
        <button className="button-web">{text.readmore}</button>
      </Link>

      {user && (
        <div>
          <button className="card-cart" onClick={handleAddToCart}>
            <IoCart className="cardcart-icon" />
          </button>
          <button
            className={`card-heart ${
              founduser.liked.some((item) => item.id === phoneCard.id)
                ? "liked"
                : "not-liked"
            }`}
            onClick={handleAddToLike}
          >
            <FaHeart className="cardheart-icon" />
          </button>
        </div>
      )}
    </div>
  );
}
