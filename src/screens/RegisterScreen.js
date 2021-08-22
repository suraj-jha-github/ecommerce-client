import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../reudux/actions/porducts/userAction";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";

const RegisterScreen = (props) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  console.log(userInfo);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerAction(name, email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, redirect]);

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div>
          <form
            className="m-auto p-4"
            style={{ maxWidth: "500px" }}
            onSubmit={submitHandler}
          >
            <div className="mb-3">
              <h1>Sing Up</h1>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Your Nmae
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              style={{ width: "100%" }}
              type="submit"
              className="btn btn-primary mb-3"
            >
              Sing In
            </button>
            <div className="mb-3" style={{ fontSize: "1.2rem" }}>
              Already have an account?{" "}
              <Link
                to={`/signin?redirect=${redirect}`}
                style={{ textDecoration: "none" }}
              >
                Sign-In
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterScreen;
