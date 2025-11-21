import useData from "../../../hooks/useData";
import Reflang from "../../../Helper/Reflang";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import useChngtext from "../../../hooks/UseChngtext";
import PhoneCard from "../../../User-interface/Components/phonecard/phonecard";
import "./Dashedit.scss";

export default function DashPhone() {
  const { lang } = Reflang();
  const endpoint = `http://localhost:5000/api/translations/${lang}/phones`;
  const { dataList, loading, status, add, update, remove } = useData(endpoint);
  const { text } = useChngtext();
  const [search, setSearch] = useState("");
  const [phonefound, setPhonefound] = useState(null);
  const [info, SetInfo] = useState(text.addphone);

  useEffect(() => {
    SetInfo(text.addphone);
  }, [text.addphone]);

  if (loading) return <h2>{text.Loading}</h2>;

  const handelserch = () => {
    const phone = dataList.find(
      (b) =>
        Number(b.id) === Number(search) ||
        b.name.toLowerCase().replace(/\s+/g, "") ===
        search.toLowerCase().replace(/\s+/g, "")
    );
    if (phone) {
      setPhonefound(phone);
      SetInfo(text.phone);
      return;
    } else {
      alert(`${text.nophone}`);
      setPhonefound(null);
      SetInfo(text.addphone);
    }
  };

  return (
    <div className="dashchang">
      <div className="status">{status}</div>

      <div className="Search">
        <input
          type="search"
          value={search}
          placeholder={text.searchphone}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch onClick={handelserch} className="Dashsearch-icon" />
      </div>

      <h1>{info}</h1>

      <div className="dashshow-edit">
        <div className="dasheditphone">
          <input
            type="text"
            placeholder={text.phoneid}
            value={phonefound?.id || ""}
            onChange={(e) =>
              setPhonefound((prev) =>
                prev ? { ...prev, id: e.target.value } : { id: e.target.value }
              )
            }
          />
          <input
            type="text"
            placeholder={text.phonebrandid}
            value={phonefound?.brandId || ""}
            onChange={(e) =>
              setPhonefound((prev) =>
                prev
                  ? { ...prev, brandId: e.target.value }
                  : { brandId: e.target.value }
              )
            }
          />
          <input
            type="text"
            placeholder={text.phonename}
            value={phonefound?.name || ""}
            onChange={(e) =>
              setPhonefound((prev) =>
                prev
                  ? { ...prev, name: e.target.value }
                  : { name: e.target.value }
              )
            }
          />
          <input
            type="text"
            placeholder={text.phoneprice}
            value={phonefound?.price || ""}
            onChange={(e) =>
              setPhonefound((prev) =>
                prev
                  ? { ...prev, price: e.target.value }
                  : { price: e.target.value }
              )
            }
          />
          <input
            type="text"
            placeholder={text.phonediscount}
            value={phonefound?.discount || ""}
            onChange={(e) =>
              setPhonefound((prev) =>
                prev
                  ? { ...prev, discount: e.target.value }
                  : { discount: e.target.value }
              )
            }
          />
          <input
            type="text"
            placeholder={text.phoneinstallment}
            value={phonefound?.installment || ""}
            onChange={(e) =>
              setPhonefound((prev) =>
                prev
                  ? { ...prev, installment: e.target.value }
                  : { installment: e.target.value }
              )
            }
          />
          <input
            type="text"
            placeholder={text.phoneimage}
            value={phonefound?.image?.[0] || ""}
            onChange={(e) =>
              setPhonefound((prev) =>
                prev
                  ? { ...prev, image: [e.target.value] }
                  : { image: [e.target.value] }
              )
            }
          />
          <input
            type="text"
            placeholder={text.phoneimages}
            value={phonefound?.images?.join(",") || ""}
            onChange={(e) =>
              setPhonefound((prev) =>
                prev
                  ? { ...prev, images: e.target.value.split(",") }
                  : { images: e.target.value.split(",") }
              )
            }
          />
          <input
            type="text"
            placeholder={text.phoneshortdesc}
            value={phonefound?.shortDesc || ""}
            onChange={(e) =>
              setPhonefound((prev) =>
                prev
                  ? { ...prev, shortDesc: e.target.value }
                  : { shortDesc: e.target.value }
              )
            }
          />
          <input
            type="text"
            placeholder={text.phonedelivery}
            value={phonefound?.delivery || ""}
            onChange={(e) =>
              setPhonefound((prev) =>
                prev
                  ? { ...prev, delivery: e.target.value }
                  : { delivery: e.target.value }
              )
            }
          />

        </div>

        <div className="dashshow">
          {phonefound && <PhoneCard phoneCard={phonefound} />}
        </div>
      </div>

      {!search ? (
        <div className="add">
          <button
            onClick={() => {
              if (!phonefound || !phonefound.id || !phonefound.name) {
                window.alert(`${text.fillinput}`);
                return;
              }
              add(phonefound);
              setPhonefound(null);
              SetInfo(text.addphone);
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
              if (!phonefound || !phonefound.id || !phonefound.name) {
                window.alert(`${text.fillinput}`);
                return;
              }
              add(phonefound);
              setPhonefound(null);
              SetInfo(text.addphone);
              setSearch("");
            }}
          >
            {text.add}
          </button>

          <button
            onClick={() => {
              if (!phonefound) {
                window.alert(`${text.nodata}`);
                return;
              }
              update(phonefound);
              setSearch("");
              setPhonefound(null);
              SetInfo(text.phone);
            }}
          >
            {text.update}
          </button>
          <button
            onClick={() => {
              if (!phonefound) {
                window.alert(`${text.nodata}`);
                return;
              }

              remove(phonefound);
              setSearch("");
              setPhonefound(null);
            }}
          >
            {text.remove}
          </button>
          <button
            onClick={() => {
              if (!phonefound && !search) {
                window.alert(`${text.nodata}`);
                return;
              }

              setPhonefound(null);
              setSearch("");
              SetInfo(text.addphone);
            }}
          >
            {text.reset}
          </button>
        </div>
      )}
    </div>
  );
}
