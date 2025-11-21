import { Link } from "react-router-dom";
import "./Login-Signup.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../../hooks/AuthContext";
import CryptoJS from "crypto-js";
import useChngtext from "../../../hooks/UseChngtext";

const SECRET_KEY = "my-secret-key";

function generateToken() {
  return CryptoJS.lib.WordArray.random(16).toString();
}

export default function Login() {
  const { text } = useChngtext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUser } = UseAuth();
  const navigate = useNavigate();

  const handeluser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/general/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const token = generateToken();
        const expiry = Date.now() + 30 * 60 * 1000;

        const authData = {
          avatar: data.user.Avatar || "https://i.pravatar.cc/40",
          token,
          expiry,
          Username: data.user.Username || "",
          role: data.user.role,
        };

        const encrypted = CryptoJS.AES.encrypt(
          JSON.stringify(authData),
          SECRET_KEY
        ).toString();

        localStorage.setItem("authData", encrypted);

        setUser(authData);
        navigate("/");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred, try again.");
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <h1>{text.login}</h1>
      <p>{text.loginnote1}</p>
      <p>{text.loginnote2}</p>
      <p>{message}</p>

      <form>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" className="button-web" onClick={handeluser}>
          {text.login}
        </button>
        {/* <Link to={"/Signup"}>{text.forgotpassword}</Link>{" "} */}
        <h6>{text.noaccount}</h6>
        <Link to={"/Signup"}>{text.signup}</Link>{" "}
      </form>
    </div>
  );
}
