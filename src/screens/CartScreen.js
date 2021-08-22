import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deletToCart,
} from "../reudux/actions/porducts/productAction";
import { useHistory } from "react-router-dom";

const CartScreen = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const deleteCartItems = (id) => {
    dispatch(deletToCart(id));
  };
  const checkOutHandler = () => {
    history.push("/signin?redirect=shipping");
  };

  return (
    <div style={{ margin: "0 1rem" }}>
      <h1>Cart Items</h1>
      <div className="row">
        {cartItems.length > 0 ? (
          <div className="col-md-8">
            <table className="table">
              <tbody className="cart-items">
                {cartItems.map((cart) => (
                  <tr className="cart-item" key={cart.product}>
                    <td>
                      <img
                        src={cart.image}
                        alt="..."
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td>{cart.name}</td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <select
                        value={cart.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(cart.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(cart.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>${cart.price}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteCartItems(cart.product)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ width: "100%" }}>Cart Is Empty</div>
        )}
        <div className="col-md-4">
          <div className="card card-body">
            <ul>
              <li>
                <h5>
                  Total ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $(
                  {cartItems
                    .reduce((a, c) => a + c.price * c.qty, 0)
                    .toFixed(2)}
                  )
                </h5>
              </li>
              <li>
                <button
                  className="btn btn-primary"
                  style={{ width: "90%", marginTop: "1rem" }}
                  onClick={checkOutHandler}
                  disabled={cartItems.length === 0}
                >
                  Proced To checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
