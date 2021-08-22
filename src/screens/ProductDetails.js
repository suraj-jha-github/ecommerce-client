import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { singleProduct } from "../reudux/actions/porducts/productAction";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";

const ProductDetails = ({ match }) => {
  const history = useHistory();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.singleProduct);
  const { product, loading, error } = productDetails;
  const productId = match.params.id;
  useEffect(() => {
    dispatch(singleProduct(productId));
  }, [dispatch, productId]);

  const addToCart = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="card" style={{ padding: "2rem 2rem" }}>
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src={product && product.image}
                alt="..."
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-md-3">
              <div className="card-body">
                <h5 className="card-title">{product && product.name}</h5>
                <hr />
                <p className="card-text">
                  <Rating
                    value={product && product.rating}
                    text={`${product && product.numReviews} review`}
                  />
                </p>
                <hr />
                <p className="card-text">Price: $ {product && product.price}</p>
                <hr />
                <p className="card-text">{product && product.descripition}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card"
                style={{ maxWidth: "18rem", margin: "0 auto" }}
              >
                <div
                  className="card-header"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>Status</div>
                  <div>
                    {product && product.countInStock > 0 ? (
                      <span className="text-success">In Stock</span>
                    ) : (
                      <span className="text-danger">Out Of Stock</span>
                    )}
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  {product.countInStock > 0 && (
                    <>
                      <li
                        className="list-group-item"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>Qty</div>
                        <div>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <button
                          className="btn btn-success"
                          style={{ width: "100%" }}
                          onClick={addToCart}
                        >
                          Add To Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
