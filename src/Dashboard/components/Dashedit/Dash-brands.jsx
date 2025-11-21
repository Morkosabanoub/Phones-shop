import { useState, useEffect } from "react";
import useData from "../../../hooks/useData";
import Reflang from "../../../Helper/Reflang";
import useChngtext from "../../../hooks/UseChngtext";
import "./Dashedit.scss";
import { FaSearch } from "react-icons/fa";

export default function Brands() {
  const { lang } = Reflang();
  const endpoint = `http://localhost:5000/api/translations/${lang}/brands`;
  const { text } = useChngtext();
  const { dataList, loading, status, add, update, remove } = useData(endpoint);
  const [search, setSearch] = useState("");
  const [brandFound, setBrandFound] = useState(null);
  useEffect(() => {
    setInfo(text.addbrand);
  }, [text.addbrand]);
  const [info, setInfo] = useState(text.addbrand);

  if (loading) return <p>{text.Loading}</p>;
  const handleSearch = () => {
    const brand = dataList.find(
      (b) =>
        b.id === Number(search) ||
        b.name.toLowerCase().replace(/\s+/g, "") ===
        search.toLowerCase().replace(/\s+/g, "")
    );

    if (brand) {
      setBrandFound(brand);
      setInfo(`${text.brand}`);
    } else {
      alert(`${text.nobrandid}`);
      setBrandFound(null);
      setInfo(`${text.addbrand}`);
    }
  };

  return (
    <div className="dashchang">
      <div className="status">{status}</div>
      <div className="Search">
        <input
          type="search"
          value={search}
          id=""
          placeholder={text.Searchbrand}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch onClick={handleSearch} className="Dashsearch-icon" />
      </div>
      <h2>{info}</h2>
      <div className="dashshow-edit">
        <div className="dashedit">
          <input
            type="text"
            value={brandFound?.name || ""}
            placeholder={text.brandname}
            onChange={(e) =>
              setBrandFound((prev) =>
                prev
                  ? { ...prev, name: e.target.value }
                  : { name: e.target.value }
              )
            }
          />
          <input
            type="text"
            value={brandFound?.logo || ""}
            placeholder={text.logolink}
            onChange={(e) =>
              setBrandFound((prev) =>
                prev
                  ? { ...prev, logo: e.target.value }
                  : { logo: e.target.value }
              )
            }
          />
        </div>
        <div className="dashshow">
          {brandFound && (
            <div>
              <h3>{brandFound.name}</h3>
              <img src={brandFound.logo} alt={brandFound.name} width="100" />
            </div>
          )}
        </div>
      </div>
      {!search ? (
        <div className="add">
          <button
            onClick={() => {
              if (!brandFound || (!brandFound.name && !brandFound.logo)) {
                alert(`${text.fillinput}`);
                return;
              }
              add(brandFound);
              setBrandFound(null);
              setSearch("");
            }}
          >
            {text.add}
          </button>
        </div>
      ) : (
        <div className="dash-buttons">
          <button
            onClick={() => {
              if (!brandFound || (!brandFound.name && !brandFound.logo)) {
                alert(`${text.fillinput}`);
                return;
              }
              add(brandFound);
              setBrandFound(null);
              setSearch("");
            }}
          >
            {text.add}
          </button>

          <button
            onClick={() => {
              if (!brandFound) {
                alert(`${text.nodata}`);
              } else {
                update(brandFound);
                setBrandFound(null);
                setSearch("");
              }
            }}
          >
            {text.update}
          </button>
          <button
            onClick={() => {
              if (!brandFound) return;
              const confirmDelete = window.confirm(
                `${text.removethebrand}${brandFound.name}`
              );
              if (confirmDelete) {
                remove(brandFound);
                setBrandFound(null);
                setSearch("");
              }
            }}
          >
            {text.remove}
          </button>
          <button
            onClick={() => {
              if (brandFound) {
                setBrandFound(null);
                setSearch("");
                setSearch("");
                setInfo(`${text.addbrand}`);
              } else {
                alert(`${text.nodata}`);
              }
            }}
          >
            {text.reset}
          </button>
        </div>
      )}
    </div>
  );
}
