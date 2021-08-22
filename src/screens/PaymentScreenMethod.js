import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { savePaymentAction } from "../reudux/actions/porducts/userAction";
import CheckOutStep from "./CheckOutStep";

const PaymentScreenMethod = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [payment, setPayment] = useState("PayPal");
  console.log(payment)
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentAction(payment));
    history.push("/placeholder");
  };

  if (!userInfo) {
    history.push("/shipping");
  }

  return (
    <div>
      <CheckOutStep step1 step2 step3></CheckOutStep>
      <form
        className="m-auto p-4"
        style={{ maxWidth: "500px" }}
        onSubmit={submitHandler}
      >
        <div className="mb-3">
          <h1>Payment</h1>
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="PayPal"
              onChange={(e) => {
                setPayment(e.target.value);
              }}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              PayPal
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value="Stripe"
              onChange={(e) => {
                setPayment(e.target.value);
              }}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Stripe
            </label>
          </div>
          <button
            type="submit"
            style={{ width: "100%", marginTop: "1rem" }}
            className="btn btn-primary mb-3"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentScreenMethod;
