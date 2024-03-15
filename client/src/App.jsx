import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import { useSelector } from "react-redux";
import Home from "./Pages/Home";
import AddProducts from "./Pages/AddProducts";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/home"
            element={currentUser?.seller ? <AddProducts /> : <Home />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
