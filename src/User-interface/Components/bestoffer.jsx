import usePhone from "../../hooks/usePhone";
import PhoneCard from "./phonecard/phonecard";
import useLoadMore from "../../hooks/useLoadMore";
import useChngtext from "../../hooks/UseChngtext";

export default function Bestoffer() {
  const { phones, loading } = usePhone();
  const { text } = useChngtext();

  const bestOffers = Array.isArray(phones)
    ? [...phones].sort((a, b) => b.discount - a.discount)
    : [];
  const { visibleItems, loadMore, keepload } = useLoadMore(bestOffers, 20);

  if (loading) return <div>{text.Loading}</div>;
  if (!phones) return <div>{text.Nophonesfound}</div>;

  if (phones.length === 0) return <div>{text.nophones}</div>;

  return (
    <>
      <div className="grid">
        {visibleItems.length === 0 ? (
          <div>{text.Nooffersavailable}</div>
        ) : (
          visibleItems.map((phone) => (
            <div key={phone.id} className="phone-card">
              <PhoneCard phoneCard={phone} />
            </div>
          ))
        )}
      </div>
      {keepload && (
        <button className="button-web" onClick={loadMore}>
          {text.LoadMore}
        </button>
      )}
    </>
  );
}
