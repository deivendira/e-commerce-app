import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import {
  /* onAuthStateChangedListerner,
createUserDocumentFromAuth,*/
  getCurrentUser,
} from "./utils/firebase/firebase.utils.js";
import { useDispatch } from "react-redux";
import Home from "./routes/home/home.component.jsx";
import Navigation from "./routes/navigation/navigation.component.jsx";
import Authentication from "./routes/authentication/authentication.component.jsx";
import Shop from "./routes/shop/shop.component.jsx";
import CheckOut from "./routes/checkout/checkout.component.jsx";
import {
  /*setCurrentUser*/ checkUserSession,
} from "./store/user/user.action.js";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="CheckOut" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};
export default App;
