import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // follow these initial state when resetting state anywhere else
  const [user, setUser] = useState("");
  const [newpost, setNewpost] = useState(false);
  const [site, setSite] = useState("bms");

  const [movie, setMovie] = useState("");
  const [moviedata, setMoviedata] = useState([]);

  const [location, setLocation] = useState([]);
  const [locdata, setLocdata] = useState([{ value: "", label: "" }]);

  const [theater, setTheater] = useState([]);
  const [theaterdata, setTheaterdata] = useState([{ value: "", label: "" }]);

  const navigate = useNavigate();

  const loginUser = async (response) => {
    axios.post(`api/verifyuser/`, response).then((response) => {
      if (response.data.id) {
        setUser(response.data.id);
        navigate("/home");
      } else {
        setUser(response.data.id);
        console.log({ error: "authentication invalid" });
        alert("something went wrong!!");
      }
    });
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
    newpost: newpost,
    setNewpost: setNewpost,
    site: site,
    setSite: setSite,
    movie: movie,
    setMovie: setMovie,
    moviedata: moviedata,
    setMoviedata: setMoviedata,
    location: location,
    setLocation: setLocation,
    locdata: locdata,
    setLocdata: setLocdata,
    theater: theater,
    setTheater: setTheater,
    theaterdata: theaterdata,
    setTheaterdata: setTheaterdata,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
