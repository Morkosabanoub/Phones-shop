// import { useState, useEffect } from "react";
import useData from "../../../hooks/useData";
import useChngtext from "../../../hooks/UseChngtext";
import UseAuth from "../../../hooks/AuthContext";
import "./Dashedit.scss";
import { useEffect, useState } from "react";

export default function Profile() {
  const { text } = useChngtext();
  const endpoint = "http://localhost:5000/api/general/users";
  const { dataList, loading, status, updatebyname, remove } = useData(endpoint);
  const { user } = UseAuth();
  const [founduser, setFoundUser] = useState({
    Username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  useEffect(() => {
    if (user && dataList.length > 0) {
      const userinfo = dataList.find(
        (b) =>
          b.Username &&
          b.Username.toLowerCase().replace(/\s+/g, "") ===
          user.Username.toLowerCase().replace(/\s+/g, "")
      );
      if (userinfo) {
        setFoundUser({
          Username: userinfo.Username || "",
          firstName: userinfo.firstName || "",
          lastName: userinfo.lastName || "",
          email: userinfo.email || "",
          phone: userinfo.phone || "",
          password: userinfo.password || "",
        });
      } else {
        <div>error</div>;
      }
    }
  }, [user, dataList]);

  if (loading) return <div>{text.loading}</div>;

  return (
    <div className="dashchang">
      <h1>user info</h1>
      <h2 className="status">{status}</h2>
      <div className="userdata">
        <label>
          <h5>{text.Username}</h5>

          <input
            type="text"
            value={founduser?.Username || ""}
            onChange={(e) =>
              setFoundUser({ ...founduser, Username: e.target.value })
            }
          />
        </label>
        <label>
          <h5>{text.firstName}</h5>
          <input
            type="text"
            value={founduser?.firstName}
            onChange={(e) =>
              setFoundUser({ ...founduser, firstName: e.target.value })
            }
          />
        </label>
        <label>
          <h5>{text.lastName}</h5>
          <input
            type="text"
            value={founduser?.lastName}
            onChange={(e) =>
              setFoundUser({ ...founduser, lastName: e.target.value })
            }
          />
        </label>
        <label>
          <h5>{text.email}</h5>

          <input
            type="email"
            value={founduser?.email}
            onChange={(e) =>
              setFoundUser({ ...founduser, email: e.target.value })
            }
          />
        </label>
        <label>
          <h5>{text.phone}</h5>

          <input
            type="tel"
            value={founduser?.phone}
            onChange={(e) =>
              setFoundUser({ ...founduser, phone: e.target.value })
            }
          />
        </label>
        <label>
          <h5>{text.password}</h5>

          <input
            type="password"
            value={founduser?.password}
            onChange={(e) =>
              setFoundUser({ ...founduser, password: e.target.value })
            }
          />
        </label>
      </div>

      <div className="dash-buttons">
        <button onClick={() => updatebyname(founduser)}>{text.update}</button>
        <button onClick={() => remove(founduser.Username)}>
          {text.remove}
        </button>
      </div>
    </div>
  );
}
