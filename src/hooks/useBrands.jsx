import { useEffect, useState } from "react";
import Reflang from "../Helper/Reflang";

export default function useBrands() {
  const [brands, setBrands] = useState([]);
  const { lang } = Reflang();

  useEffect(() => {
    fetch(`http://localhost:5000/api/translations/${lang}/brands`)
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
      })
      .catch((err) => console.log(err));
  }, [lang]);

  return { brands };
}
