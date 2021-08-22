import axios from "axios";
import {
  SAVE_PAYMENT_METHOD,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCESS,
  USER_SIGNOUT,
} from "../actionType";

export const registerAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const { data } = await axios.post("/api/user/register/", {
      name,
      email,
      password,
    });
    dispatch({
      type: USER_REGISTER_SUCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const signinAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNIN_REQUEST,
    });
    const { data } = await axios.post("/api/user/signin/", { email, password });
    dispatch({
      type: USER_SIGNIN_SUCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const signoutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItem");
  localStorage.removeItem("shippingAddress");
  dispatch({
    type: USER_SIGNOUT,
  });
};

export const savePaymentAction = (data) => (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: data,
  });
};
