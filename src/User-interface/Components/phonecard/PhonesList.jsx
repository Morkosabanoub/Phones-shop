import "./phonecard.scss";
import usePhone from "../../../hooks/usePhone";
import Phonecard from "./phonecard";
import useLoadMore from "../../../hooks/useLoadMore";
import useChngtext from "../../../hooks/UseChngtext";

export default function PhonesList() {
  const { text } = useChngtext();
  const { phones, loading } = usePhone();
  const { visibleItems, loadMore, keepload } = useLoadMore(phones || [], 10);

  if (loading || !phones) return <div>{text.Loading}</div>;
  return (
    <div>
      <div className="grid">
        {visibleItems.length === 0 ? (
          <div>{text.Nophonesfound}</div>
        ) : (
          visibleItems.map((phone) => (
            <Phonecard key={phone.id} phoneCard={phone} />
          ))
        )}
      </div>
      {keepload && (
        <button className="button-web" onClick={loadMore}>
          {text.LoadMore}
        </button>
      )}
    </div>
  );
}
