import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticate: false,
    user: null,
  });

  const checkAuth = async () => {
    const res = await axios.get("/api/v1/auth/verfiyToken", {
      headers: {
        "x-auth-token": localStorage.getItem("user-token"),
      },
    });
    console.log(res);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const registerUser = async (data) => {
    try {
      const res = await axios.post("/api/v1/auth/register", data);
      //console.log(res);
      if (res.data.success) {
        localStorage.setItem("user-token", res.data.token);
        alert(res.data.message);
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loginUser = async (data) => {
    try {
      const res = await axios.post("/api/v1/auth/login", data);
      //console.log(res);
      if (res.data.success) {
        localStorage.setItem("user-token", res.data.token);
        alert(res.data.message);
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...auth, setAuth, registerUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};
