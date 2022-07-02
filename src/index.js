import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
// import { UseProvider } from "./contexts/user.contexts";
//import { CategoriesProvider } from "./contexts/categories.context";
//import { CartProvider } from "./contexts/cart.context";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { store, persistor } from "./store/store";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/stripe/stripe.utils";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          {/*<UseProvider>?*/}
          {/*<CategoriesProvider> */}
          {/* <CartProvider>*/}
          <Elements stripe={stripePromise}>
            <App />
          </Elements>

          {/* <CartProvider>*/}
          {/*</CategoriesProvider> */}
          {/*</UseProvider>*/}
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
