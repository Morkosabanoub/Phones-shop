
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

const savedLang =
  localStorage.getItem("lang") || navigator.language.split("-")[0] || "en";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: savedLang,
    fallbackLng: "en",
    load: "languageOnly",
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "/local/{{lng}}/translation.json",
    },
    react: { useSuspense: true },
  });

export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  localStorage.setItem("lang", lng);
};

export default i18n;
