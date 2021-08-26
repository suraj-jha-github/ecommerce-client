import React, { useEffect } from "react";
import ProductScreen from "./ProductScreen";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../reudux/actions/porducts/productAction";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";

const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);
  return (
    <>
      <div>
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <div
           className="homepage"
          >
            {products &&
              products.map((product) => <ProductScreen product={product} />)}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
