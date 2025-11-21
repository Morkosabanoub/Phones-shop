
import { useState, useEffect } from "react";
import i18n from "./i18n";

export default function Reflang() {
  const [lang, setLang] = useState(
    localStorage.getItem("lang") || i18n.language
  );

  useEffect(() => {
    const handleLangChange = (newLang) => {
      setLang(newLang);
      localStorage.setItem("lang", newLang);
    };

    i18n.on("languageChanged", handleLangChange);
    return () => i18n.off("languageChanged", handleLangChange);
  }, []);

  const changeLang = (newLang) => {
    i18n.changeLanguage(newLang);
  };

  return { lang, setLang: changeLang };
}