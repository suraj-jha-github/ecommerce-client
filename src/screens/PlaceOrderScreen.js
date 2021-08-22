import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOrderAction } from "../reudux/actions/porducts/orderAction";
import CheckOutStep from "./CheckOutStep";

const PlaceOrderScreen = () => {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error, success, order } = orderCreate;
  console.log(loading, error, success, order);
  const dispatch = useDispatch();
  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  const toPrice = (num) => Number(num.toFixed(2));

  cart.itemPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingCharg = cart.itemPrice > 100 ? 10 : 0;
  cart.texPrice = toPrice((cart.itemPrice * 3) / 10);
  cart.totalPrice = toPrice(
    cart.itemPrice + cart.shippingCharg + cart.texPrice
  );

  const placeOrderHandler = () => {
    dispatch(createOrderAction({ ...cart, orderItems: cart.cartItems }));
    history.push("/")
    localStorage.removeItem('cartItem')
  };
  return (
    <div>
      <CheckOutStep step1 step2 step3 step4></CheckOutStep>
      <div className="col-md-12 row" style={{ marginRight: "1rem" }}>
        <div className="container col-md-8">
          <ul>
            <li>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Shipping</h5>
                  <p className="card-text">
                    <strong>Name:</strong> {cart.shippingAddress.fullName}
                    <br />
                    <strong>Address:</strong> {cart.shippingAddress.address}
                    ,&nbsp;{cart.shippingAddress.city},&nbsp;
                    {cart.shippingAddress.postCode},&nbsp;
                    {cart.shippingAddress.country}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="card" style={{ marginTop: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Payment</h5>
                  <p className="card-text">
                    <strong>Mthod</strong>: {cart.paymentMethod}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="card" style={{ marginTop: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Order Items</h5>
                  {cart.cartItems.length > 0 ? (
                    <div>
                      <table className="table">
                        <tbody>
                          {cart.cartItems.map((cart) => (
                            <tr
                              className="order-item"
                              key={cart.product}
                            >
                              <td>
                                <img
                                  src={cart.image}
                                  alt="..."
                                  style={{ width: "50px" }}
                                />
                              </td>
                              <td>{cart.name}</td>
                              <td>
                                {cart.qty} X ${cart.price} = $
                                {(cart.qty * cart.price).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div style={{ width: "100%" }}>Cart Is Empty</div>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <ul>
                <li>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Items:</div>
                    <div>${cart.itemPrice}</div>
                  </div>
                </li>
                <li>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Shipping:</div>
                    <div>${cart.shippingCharg}</div>
                  </div>
                </li>
                <li>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>G.S.T:</div>
                    <div>${cart.texPrice}</div>
                  </div>
                </li>
                <li>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Total:</div>
                    <div>${cart.totalPrice}</div>
                  </div>
                </li>
                <li>
                  <button
                    type="submit"
                    style={{ width: "100%" }}
                    className="btn btn-primary mt-3"
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
