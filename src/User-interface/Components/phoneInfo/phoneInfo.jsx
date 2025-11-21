import useSlider from "../../../hooks/useSlider.jsx";
import "./phoneInfo.scss";
import useChngtext from "../../../hooks/UseChngtext.jsx";
import useData from "../../../hooks/useData.jsx";
import UseAuth from "../../../hooks/AuthContext.jsx";
import { useEffect, useState } from "react";

export default function PhoneInfo({ phoneInfo }) {
  const { text } = useChngtext();
  const { currentIndex, goTo } = useSlider(phoneInfo.images, 1, 0);
  const endpoint = `http://localhost:5000/api/general/users`;
  const { dataList, status, updatebyname } = useData(endpoint);
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

  if (!phoneInfo) return <div>{text.nophones}</div>;

  const finalPrice =
    phoneInfo.discount > 0
      ? phoneInfo.price - phoneInfo.discount
      : phoneInfo.price;

  const discountPercent = Math.round(
    (phoneInfo.discount / phoneInfo.price) * 100
  );

  const handleAddToCart = () => {
    const updatedUser = {
      ...founduser,
      cart: [...(founduser.cart || []), { id: phoneInfo.id }],
    };
    setFoundUser(updatedUser);

    updatebyname({
      Username: updatedUser.Username,
      cart: updatedUser.cart,
      liked: updatedUser.liked,
    });
  };

  const handleAddToLike = () => {
    if (founduser.liked.some((item) => item.id === phoneInfo.id)) return;

    const updatedUser = {
      ...founduser,
      liked: [...(founduser.liked || []), { id: phoneInfo.id }],
    };
    setFoundUser(updatedUser);

    updatebyname({
      Username: updatedUser.Username,
      cart: updatedUser.cart,
      liked: updatedUser.liked,
    });
  };

  return (
    <div key={phoneInfo.id}>
      <div className="phoneinfo-main">
        <div className="phoneinfo-upper">
          <div className="phoneInfo-img">
            <div className="main-box-img">
              {Array.isArray(phoneInfo.images) ? (
                <img
                  className="main-img"
                  src={phoneInfo.images[currentIndex]}
                  alt={phoneInfo.name}
                  loading="lazy"
                />
              ) : (
                <img
                  className="main-img"
                  src={phoneInfo.images}
                  alt={phoneInfo.name}
                  loading="lazy"
                />
              )}
            </div>
            <div className="slider-img">
              {Array.isArray(phoneInfo.images) && (
                <div className="Photos-slider">
                  {phoneInfo.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`thumbnail-${index}`}
                      className={index === currentIndex ? "active-thumb" : ""}
                      onClick={() => goTo(index)}
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="phoneInfo-info">
            <h1 className="phoneInfo-name">{phoneInfo.name}</h1>
            <span>{phoneInfo.shortDesc}</span>

            <span
              className={`phonecard-price ${
                phoneInfo.discount > 0 ? "redline" : ""
              }`}
            >
              <b>{text.price}</b> {phoneInfo.price}
              {text.currency}
            </span>

            <span className="phoneInfo-finl-price">
              <b>{text.price}</b> {finalPrice}
              {text.currency}
            </span>

            <span className="phoneInfo-insta">
              <b>{text.installment}</b>{" "}
              {phoneInfo?.installment
                ? text.installmentTrue
                : text.installmentFalse}
            </span>

            <span
              className={`phoneInfo-discound ${
                phoneInfo.discount > 0 ? "show" : "hide"
              }`}
            >
              {discountPercent} {text.Percentage}
            </span>

            <span>
              <b>{text.delivery} </b>
              {phoneInfo.delivery}
            </span>
            <div>{status}</div>

            <div className="phoneinpo-buttons">
              <button onClick={handleAddToCart}>{text.addToCart}</button>
              <button onClick={handleAddToLike}>{text.addToFav}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="phone-specs">
        <h3>{text.specifications}</h3>
        <ul>
          {phoneInfo.specs && phoneInfo.specs.length > 0 ? (
            phoneInfo.specs.map((spec, index) => (
              <li key={index}>
                <i className={spec.icon}></i>
                <b>{spec.title}:</b> <span>{spec.value}</span>
              </li>
            ))
          ) : (
            <li>{text.nospecifications}</li>
          )}
        </ul>
      </div>

      <div className="phone-reviews">
        <h3>{text.ratings}</h3>
        <ul>
          {phoneInfo.reviews && phoneInfo.reviews.length > 0 ? (
            phoneInfo.reviews.map((rev, index) => (
              <li key={index}>
                <b>{rev.user}</b> {rev.comment}
              </li>
            ))
          ) : (
            <li>{text.noreviews}</li>
          )}
        </ul>
      </div>
    </div>
  );
}
