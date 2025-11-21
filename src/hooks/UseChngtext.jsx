import { useEffect, useState } from "react";
import Reflang from "../Helper/Reflang";

export default function useChngtext() {
  const [text, setText] = useState([]);
  const { lang } = Reflang();

  useEffect(() => {
    const cached = localStorage.getItem(`text-${lang}`);
    if (cached) {
      setText(JSON.parse(cached));
    }

    fetch(`http://localhost:5000/api/translations/${lang}/text`)
      .then((res) => res.json())
      .then((data) => {
        setText(data);
        localStorage.setItem(`text-${lang}`, JSON.stringify(data));
      })
      .catch((err) => console.log(err));
  }, [lang]);
  return { text };
}
