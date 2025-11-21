import { createContext, useContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const AuthContext = createContext();
const SECRET_KEY = "my-secret-key";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const encryptedData = localStorage.getItem("authData");
    if (encryptedData) {
      try {
        const decrypted = CryptoJS.AES.decrypt(
          encryptedData,
          SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        const authData = JSON.parse(decrypted);

        if (authData.expiry > Date.now()) {
          setUser(authData);
        } else {
          localStorage.removeItem("authData");
        }
      } catch (err) {
        console.error("Error decrypting authData", err);
        localStorage.removeItem("authData");
      }
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authData");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function UseAuth() {
  return useContext(AuthContext);
}
