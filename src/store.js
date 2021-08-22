import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  CartReducer,
  productListReducer,
  singleProductReducer,
} from "./reudux/reducer/productReducer";
import { registerReducer, signinReducer } from "./reudux/reducer/userReducer";
import { orderCreateReducer } from "./reudux/reducer/orderReducer";

const reducer = combineReducers({
  productList: productListReducer,
  singleProduct: singleProductReducer,
  cart: CartReducer,
  userSignin: signinReducer,
  userRegister: registerReducer,
  orderCreate: orderCreateReducer,
});
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;