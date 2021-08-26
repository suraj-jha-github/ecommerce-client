import React from "react";
import Rating from "../components/Rating";
import {Link} from 'react-router-dom'

const ProductScreen = ({ product }) => {
  return (
    <div className="card" style={{margin: "1.5rem" }}>
      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <img src={product.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">
            <Rating value={product.rating} text={`${product.numReviews} review`}/>
          </p>
          <p className="card-text">
            $ {product.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductScreen;
