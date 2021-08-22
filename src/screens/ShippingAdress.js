import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveShippingAdress } from "../reudux/actions/porducts/productAction";
import CheckOutStep from "./CheckOutStep";

const ShippingAdress = () => {
  const history = useHistory();

  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart
  console.log(cart)

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postCode, setPostCode] = useState(shippingAddress.postCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  if(!userInfo){
      history.push('/signin')
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAdress({ fullName, address, city, postCode, country })
    );
    history.push("/payment");
  };
  return (
    <div>
      <CheckOutStep step1 step2></CheckOutStep>
      <div>
        <form
          className="m-auto p-4"
          style={{ maxWidth: "500px" }}
          onSubmit={submitHandler}
        >
          <div className="mb-3">
            <h1>Shipping Address</h1>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputCity"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPostCode" className="form-label">
              Postal Code
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPostCode"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputCountry" className="form-label">
              Country
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputCountry"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <button
            type="submit"
            style={{ width: "100%" }}
            className="btn btn-primary mb-3"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingAdress;
