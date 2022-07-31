import Home from "./pages/Home";
import Loginpage from "./pages/Loginpage";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./util/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Loginpage />} exact />
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/home" exact />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
