import "./App.css";
import { useRoutes } from "react-router-dom";
import routes  from "./Routes/Routes";
import "flag-icons/css/flag-icons.min.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function App() {
  const element = useRoutes(routes());
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", i18n.language);
    }
  }, [i18n.language]);


  return <>{element}</>;
}
