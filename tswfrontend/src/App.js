import Home from "./pages/Home";
import Loginpage from "./pages/Loginpage";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./auth/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/home" exact />
        </Route>
      </Routes>
    </>
  );
}

export default App;
