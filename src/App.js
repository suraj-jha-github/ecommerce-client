import React from "react";
import Headers from "./components/Headers";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductDetails from "./screens/ProductDetails";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAdress from "./screens/ShippingAdress";
import PaymentScreenMethod from "./screens/PaymentScreenMethod";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import Footer from "./components/Footer";

const App = () => {
  return (

      <Router>
        <Headers />
        <main>
          <Route exact path="/cart/:id?" component={CartScreen} />
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/signin" component={SigninScreen} />
          <Route exact path="/shipping" component={ShippingAdress} />
          <Route exact path="/payment" component={PaymentScreenMethod} />
          <Route exact path="/placeholder" component={PlaceOrderScreen} />
        </main>
        <Footer/>
      </Router>
  );
};

export default App;
