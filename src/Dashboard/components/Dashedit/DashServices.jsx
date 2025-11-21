import useData from "../../../hooks/useData";
import Reflang from "../../../Helper/Reflang";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import useChngtext from "../../../hooks/UseChngtext";
import "./Dashedit.scss";

export default function Services() {
  const { lang } = Reflang();
  const endpoint = `http://localhost:5000/api/translations/${lang}/services`;
  const { dataList, loading, status, add, update, remove } = useData(endpoint);
  const { text } = useChngtext();
  const [search, setSearch] = useState("");
  const [servicefound, setServicefound] = useState(null);

  useEffect(() => {
    SetInfo(text.addservice);
  }, [text.addservice]);
  const [info, SetInfo] = useState(text.addservice);

  if (loading) return <h2>{text.Loading}</h2>;
  const handelserch = () => {
    const service = dataList.find(
      (b) =>
        Number(b.id) === Number(search) ||
        b.title.toLowerCase().replace(/\s+/g, "") ===
        search.toLowerCase().replace(/\s+/g, "")
    );
    if (service) {
      setServicefound(service);
      SetInfo(text.service);
      return;
    } else {
      alert(`${text.noservice}`);
      setServicefound(null);
      SetInfo(text.addservice);
    }
  };
  return (
    <div className="dashchang">
      <div className="status">{status}</div>
      <div className="Search">
        <input
          type="search"
          value={search}
          placeholder={text.Searchservice}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch onClick={handelserch} className="Dashsearch-icon" />
      </div>
      <h1>{info}</h1>

      <div className="dashshow-edit">
        <div className="dashedit">
          <input
            type="text"
            placeholder={text.servicetitel}
            value={servicefound?.title || ""}
            onChange={(e) =>
              setServicefound((prev) =>
                prev
                  ? { ...prev, title: e.target.value }
                  : { title: e.target.value }
              )
            }
          />
          <input
            type="text"
            placeholder={text.servicetext}
            value={servicefound?.text || ""}
            onChange={(e) =>
              setServicefound((prev) =>
                prev
                  ? { ...prev, text: e.target.value }
                  : { text: e.target.value }
              )
            }
          />
          <input
            type="text"
            placeholder={text.serviceicon}
            value={servicefound?.icon || ""}
            onChange={(e) =>
              setServicefound((prev) =>
                prev
                  ? { ...prev, icon: e.target.value }
                  : { icon: e.target.value }
              )
            }
          />
        </div>
        <div className="dashshow">
          {servicefound && (
            <div className="viweservice-card">
              <i className={servicefound?.icon}></i>
              <h3>{servicefound?.title}</h3>
              <p>{servicefound?.text}</p>
            </div>
          )}
        </div>
      </div>
      {!search ? (
        <div className="add">
          <button
            onClick={() => {
              if (
                !servicefound ||
                !servicefound.id ||
                !servicefound.title ||
                !servicefound.text ||
                !servicefound.icon
              ) {
                window.alert(`${text.fillinput}`);
                return;
              }
              add(servicefound);
              setServicefound(null);
              SetInfo(text.addservice);
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
              if (
                !servicefound ||
                !servicefound.id ||
                !servicefound.title ||
                !servicefound.text ||
                !servicefound.icon
              ) {
                window.alert(`${text.fillinput}`);
                return;
              }
              add(servicefound);
              setServicefound(null);
              SetInfo(text.addservice);
              setSearch("");
            }}
          >
            {text.add}
          </button>

          <button
            onClick={() => {
              if (!servicefound) {
                window.alert(`${text.nodata}`);
                return;
              }
              update(servicefound);
              setSearch("");
              setServicefound(null);
              SetInfo(text.service);
            }}
          >
            {text.update}
          </button>
          <button
            onClick={() => {
              if (!servicefound) {
                window.alert(`${text.nodata}`);
                return;
              }

              remove(servicefound);
              setSearch("");
              setServicefound(null);
            }}
          >
            {text.remove}
          </button>
          <button
            onClick={() => {
              if (!servicefound && !search) {
                window.alert(`${text.nodata}`);
                return;
              }

              setServicefound(null);
              setSearch("");
              SetInfo(text.addservice);
            }}
          >
            {text.reset}
          </button>
        </div>
      )}
    </div>
  );
}
