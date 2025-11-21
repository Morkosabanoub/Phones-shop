import { useState, useEffect } from "react";
import Reflang from "../../../Helper/Reflang";
import useData from "../../../hooks/useData";
import useChngtext from "../../../hooks/UseChngtext";
import { FaSearch } from "react-icons/fa";
import './Dashedit.scss'

export default function Slider() {
  const { lang } = Reflang();
  const { text } = useChngtext();
  const endpoint = `http://localhost:5000/api/translations/${lang}/slider`;
  const { dataList, loading, status, add, update, remove } = useData(endpoint);
  const [search, setSearch] = useState("");
  const [foundSlider, setFoundSlider] = useState(null);
  useEffect(() => {
    SetInfo(text.addslider);
  }, [text.addslider]);
  const [info, SetInfo] = useState(text.addslider);

  if (loading) return <div>{text.loading}</div>;
  const handleSearch = () => {
    const slider = dataList.find(
      (b) =>
        Number(b.id) === Number(search) ||
        b.title.toUpperCase().replace(/\s+/g, "") ===
        search.toUpperCase().replace(/\s+/g, "")
    );
    if (slider) {
      setFoundSlider(slider);
      SetInfo(text.slider);
    } else {
      setFoundSlider(null);
      SetInfo(text.addslider);
    }
  };

  return (
    <div className="dashchang">
      <div className="status">{status}</div>
      <div className="Search">
        <input
          type="search"
          value={search}
          placeholder={text.searchslider}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch onClick={handleSearch} className="Dashsearch-icon" />
      </div>
      <h1>{info}</h1>
      <div className="dashshow-edit">
        <div className="dashedit">
          <input
            type="text"
            value={foundSlider?.title || ""}
            placeholder={text.slidertitel}
            onChange={(e) =>
              setFoundSlider((prev) =>
                prev
                  ? { ...prev, title: e.target.value }
                  : { title: e.target.value }
              )
            }
          />
          <input
            type="text"
            value={foundSlider?.subtitle || ""}
            placeholder={text.slidersubitel}
            onChange={(e) =>
              setFoundSlider((prev) =>
                prev
                  ? { ...prev, subtitle: e.target.value }
                  : { subtitle: e.target.value }
              )
            }
          />
          <input
            type="text"
            value={foundSlider?.image || ""}
            placeholder={text.sliderimg}
            onChange={(e) =>
              setFoundSlider((prev) =>
                prev
                  ? { ...prev, image: e.target.value }
                  : { image: e.target.value }
              )
            }
          />
        </div>
      </div>
      {foundSlider && (
        <div className="dashshow">
          <h3>{foundSlider?.title}</h3>
          <p>{foundSlider?.subtitle}</p>
          <img src={foundSlider?.image} />
        </div>
      )}
      {!search ? (
        <div className="add">
          <button
            onClick={() => {
              if (
                !foundSlider ||
                (!foundSlider.title &&
                  !foundSlider.subtitle &&
                  !foundSlider.image)
              ) {
                alert(`${text.nodata}`);
              } else {
                add(foundSlider);
                setSearch("");
                setFoundSlider(null);
                SetInfo(text.addslider);
              }
            }}
          >
            {text.add}
          </button>
        </div>
      ) : (
        <div className="dash-buttons">
          <button
            onClick={() => {
              if (
                !foundSlider ||
                (!foundSlider.title &&
                  !foundSlider.subtitle &&
                  !foundSlider.image)
              ) {
                alert(`${text.nodata}`);
              } else {
                add(foundSlider);
                setSearch("");
                setFoundSlider(null);
                SetInfo(text.addslider);
              }
            }}
          >
            {text.add}
          </button>
          <button
            onClick={() => {
              if (!foundSlider) {
                alert(`${text.nodata}`);
              } else {
                update(foundSlider);
                setSearch("");
                setFoundSlider(null);
                SetInfo(text.addslider);
              }
            }}
          >
            {text.update}
          </button>
          <button
            onClick={() => {
              if (!foundSlider) {
                alert(`${text.nodata}`);
              } else {
                remove(foundSlider);
                setSearch("");
                setFoundSlider(null);
                SetInfo(text.addslider);
              }
            }}
          >
            {text.remove}
          </button>
          <button
            onClick={() => {
              if (!foundSlider) {
                alert(`${text.nodata}`);
              } else {
                setSearch("");
                setFoundSlider(null);
                SetInfo(text.addslider);
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
