import { useEffect, useState } from "react";
import useChngtext from "../hooks/UseChngtext";

export default function useData(endpoint) {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const { text } = useChngtext();

  useEffect(() => {
    if (!endpoint) return;
    setLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setDataList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setStatus(text.failedtofetch);
      });
  }, [endpoint, text.failedtofetch]);

  const add = async (item) => {
    const lastId = dataList.length ? Math.max(...dataList.map((d) => d.id)) : 0;
    const newItem = { ...item, id: lastId + 1 };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) throw new Error("Error adding item");
      setDataList((prev) => [...prev, newItem]);
      setStatus(text.successfuladd);
    } catch (err) {
      console.log(err);
      setStatus(text.failedadd);
    }
  };

  const update = async (item) => {
    try {
      const res = await fetch(`${endpoint}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) throw new Error("Error updating item");
      setDataList((prev) => prev.map((d) => (d.id === item.id ? item : d)));
      setStatus(text.successfulupdate);
    } catch (err) {
      console.log(err);
      setStatus(text.failedupdate);
    }
  };
  const updatebyname = async (updatedUser) => {
    try {
      const res = await fetch(`${endpoint}/${updatedUser.Username}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser), 
      });

      if (!res.ok) throw new Error("Error updating user");

      const user = await res.json();

      setDataList((prev) =>
        prev.map((d) => (d.Username === updatedUser.Username ? user : d))
      );

      setStatus(text.successfulupdate);
    } catch (err) {
      console.log(err);
      setStatus(text.failedupdate);
    }
  };


  const removebyname = async (item) => {
    try {
      const res = await fetch(`${endpoint}/${item.Username}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error removing item");
      setDataList((prev) => prev.filter((d) => d.Username !== item.Username)); 
      setStatus(text.successfulremove);
    } catch (err) {
      console.log(err);
      setStatus(text.failedremove);
    }
  };



  const remove = async (item) => {
    try {
      const res = await fetch(`${endpoint}/${item.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error removing item");
      setDataList((prev) => prev.filter((d) => d.id !== item.id));
      setStatus(text.successfulremove);
    } catch (err) {
      console.log(err);
      setStatus(text.failedremove);
    }
  };
  

  return { dataList, loading, status, add, update, remove, updatebyname,removebyname };
}
