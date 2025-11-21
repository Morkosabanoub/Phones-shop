import usePhone from "../../../hooks/usePhone";
import PhoneCard from "../phonecard/phonecard";
import "./bestofferslider.scss";
import useSlider from "../../../hooks/useSlider";
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";
import UseChngtext from "../../../hooks/UseChngtext";

export default function Bestofferslider() {
  const { text } = UseChngtext();

  const { phones, loading } = usePhone(0);

  const getPhones = Array.isArray(phones) ? phones : [];
  const phonesort = [...getPhones].sort((a, b) => b.discount - a.discount);

  const maxSlider = phonesort.slice(0, 15);
  const {
    currentIndex,
    nextIndex,
    prevIndex,
    visiblecount,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSlider(maxSlider.length, 5, true, 10000, {
    mobile: 2,
    tablet: 3,
    desktop: 5,
  });

  const Sliderslice = maxSlider.slice(
    currentIndex,
    currentIndex + visiblecount
  );

  if (loading) return <div>{text.Loading}</div>;
  if (!phones || phones.length === 0)
    return <div>{text.Nooffersavailable}</div>;

  return (
    <div
      className="bestofferslider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <h1>{text.bestOffer}</h1>
      <div>
        {Sliderslice.length === 0 ? (
          <div>{text.noitems}</div>
        ) : (
          <div className="grid">
            {Sliderslice.map((item) => (
              <div key={item.id}>
                <PhoneCard phoneCard={item} />
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="sliderprve" onClick={prevIndex}>
        <IoArrowBackCircleOutline />
      </button>
      <button className="slidernext" onClick={nextIndex}>
        <IoArrowForwardCircleOutline />
      </button>
      <button
        className="button-web"
        onClick={() => (window.location.href = `/BestOffer`)}>
        {text.exploremoreoffers}
      </button>
    </div>
  );
}
