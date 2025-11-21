import { useState, useEffect } from "react";
import Reflang from "../Helper/Reflang";

export default function UsePhone() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = Reflang();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/translations/${lang}/phones`)
      .then((res) => res.json())
      .then((data) => {
        setPhones(data);
        setLoading(false);
      })

      .catch((err) => console.log(err));
  }, [lang]);

  return { phones, loading };
}
