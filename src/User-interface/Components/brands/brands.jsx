import usePhoFilter from "../../../hooks/usePhoFilter";
import PhoneCard from "../phonecard/phonecard";
import "./brands.scss";
import useBrands from "../../../hooks/useBrands";
import useLoadMore from "../../../hooks/useLoadMore";
import useChngtext from "../../../hooks/UseChngtext";

export default function Brands({ brandId }) {
  const { text } = useChngtext();
  const { brands } = useBrands();
  const { filterPhones } = usePhoFilter({ brandId });
  const { visibleItems, loadMore, keepload } = useLoadMore(filterPhones, 10);

  if (!brands) return <div>Loading brand...</div>;

  const filterbrandname = brands.filter((brand) => brand.id === brandId);

  return (
    <>
      <div className="brandname">
        {filterbrandname.length === 0 ? (
          <div>{text.nobrand}</div>
        ) : (
          <h1>{filterbrandname[0].name}</h1>
        )}
      </div>

      <div className="grid">
        {visibleItems.length === 0 ? (
          <div>{text.Nophonesforthisbrand}</div>
        ) : (
          visibleItems.map((phone) => (
            <div className="brandsShow" key={phone.id}>
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
//
