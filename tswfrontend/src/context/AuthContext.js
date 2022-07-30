import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [newpost, setNewpost] = useState(false);

  const navigate = useNavigate();

  const loginUser = async (response) => {
    axios.post(`api/verifyuser/`, response).then((response) => {
      if (response.data.id) {
        setUser(response.data.id);
        navigate("/");
      } else {
        console.log({ error: "authentication invalid" });
        alert("something went wrong!!");
      }
    });
  };

  const triggerNewpost = async (trigger) => {
    setNewpost(trigger);
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
    newpost: newpost,
    triggerNewpost: triggerNewpost,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
