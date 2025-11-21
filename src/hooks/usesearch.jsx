import useData from "./useData";
import Reflang from "../Helper/Reflang";
import { useState } from "react";

export default function Usesearch() {
  const { lang } = Reflang();
  const endpoint = `http://localhost:5000/api/translations/${lang}/phones`;
  const { dataList, loading } = useData(endpoint);

  const [search, setSearch] = useState("");
  const [searchfound, setSearchfound] = useState([]);
  const [noitem, setNoitem] = useState("");

  const handleSearch = () => {
    const results = dataList.filter((b) =>
      b.name
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(search.toLowerCase().replace(/\s+/g, ""))
    );
    
    if (results.length > 0) {
      setSearchfound(results);
      setNoitem("");
    } else {
      setSearchfound([]);
      setNoitem("no item");
    }
  };

  if (loading) return <div>loading...</div>;

  return {
    search,
    handleSearch,
    noitem,
    setSearch,
    searchfound,
    setSearchfound,
  };
}
