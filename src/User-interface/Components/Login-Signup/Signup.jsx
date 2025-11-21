import { useState } from "react";
import { NavLink } from "react-router-dom";
import useChngtext from "../../../hooks/UseChngtext";
import { useNavigate } from "react-router-dom";
import "./Login-Signup.scss";
export default function Signup() {
  const { text } = useChngtext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: Date.now(),
    Username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    Avatar: "https://i.pravatar.cc/40",
    cart: [],
    liked: [],
  });

  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setFormData({ ...formData, password: value });
      checkPasswordStrength(value);
    } else if (name === "repeatPassword") {
      setRepeatPassword(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) setPasswordStrength(`${text.weak}`);
    else if (
      password.match(/[A-Z]/) &&
      password.match(/[0-9]/) &&
      password.length >= 8
    )
      setPasswordStrength(`${text.strong}`);
    else setPasswordStrength(`${text.medium}`);
  };

  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert(`${text.invalidEmail}`);
      return;
    }

    if (formData.password !== repeatPassword) {
      alert(`${text.passnotmatch}`);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/general/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`${text.sucsignup}`);
        navigate("/Login");
      } else {
        alert(data.message || `${text.wronsignup}`);
      }
    } catch (err) {
      console.error(err);
      alert(`${text.wronsignup}`);
    }
  };

  return (
    <div className="signup">
      <h2>{text.signup}</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="firstName"
          placeholder={text.firstName}
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder={text.lastName}
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Username"
          placeholder={text.Username}
          value={formData.Username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder={text.phone}
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder={text.password}
          value={formData.password}
          onChange={handleChange}
        />
        <small>
          {" "}
          {text.passwordStrength} {passwordStrength}
        </small>
        <input
          type="password"
          name="repeatPassword"
          placeholder={text.repeatPassword}
          value={repeatPassword}
          onChange={handleChange}
        />
        <label>
          <input type="checkbox" required />{" "}
          <NavLink className="terms" to={"/"}>
            {text.terms}
          </NavLink>
        </label>
        <button type="submit" className="button-web">
          {text.signup}
        </button>
      </form>
    </div>
  );
}
