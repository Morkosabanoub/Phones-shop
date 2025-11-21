import "./Dashnavbar.scss";
import i18n from "../../../Helper/i18n";
import { useState } from "react";
import Usesearch from "../../../hooks/usesearch";
import { FaSearch } from "react-icons/fa";
import { generateSlug, scrollToOutlet } from "../../../Helper/helpers";
import { Link } from "react-router-dom";
import useChngtext from "../../../hooks/UseChngtext";


export default function DashNavBar() {
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
  };

  const { search, handleSearch, setSearch, searchfound } = Usesearch("");

  const { text } = useChngtext();

  return (
    <div className="Dashnavbar">
      <div className="dashnavsearch">
        <div className="search">
          <input
            type="search"
            value={search || ""}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch();
            }}
            placeholder={text.search}
          />
          <FaSearch onClick={handleSearch} className="dashsearch-icon" />
          <div className={"search-results"}>
            {search && (
              <ul>
                {searchfound.map((b) => (
                  <li key={b.id} o>
                    <Link
                      to={`/phone/${generateSlug(b.name)}`}
                      onClick={() => {
                        scrollToOutlet();
                        setSearch("");
                      }}
                    >
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="dashlang">
        <span className="dashcurrentlang">
          <span
            className={`fi fi-${currentLang === "ar" ? "eg" : currentLang === "ua" ? "ua" : "sh"
              }`}
          ></span>
        </span>
        <div className="dashdroplang">
          <button type="button" onClick={() => changeLang("en")}>
            <span className="fi fi-sh"></span>
          </button>
          <button type="button" onClick={() => changeLang("ar")}>
            <span className="fi fi-eg"></span>
          </button>
          <button type="button" onClick={() => changeLang("ua")}>
            <span className="fi fi-ua"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
