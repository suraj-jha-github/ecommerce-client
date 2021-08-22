import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { signinAction } from "../reudux/actions/porducts/userAction";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";

const SigninScreen = (props) => {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const redirect = props.location.search? props.location.search.split("=")[1] : "/"
  const userSignin = useSelector(state => state.userSignin)
  const {userInfo, loading, error} = userSignin

  const dispatch = useDispatch()

  const submitHandler = (e)=>{
    e.preventDefault()
    dispatch(signinAction(email, password))
  }

  useEffect(() => {
    if(userInfo){
      history.push(redirect)
    }
  }, [userInfo, redirect])

  return (
    <div>
      {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <div>
      <form className="m-auto p-4" style={{ maxWidth: "500px" }} onSubmit={submitHandler}>
        <div className="mb-3">
          <h1>Sing In</h1>
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
            onChange={(e)=>setEmail(e.target.value)}
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
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <button style={{width:'100%'}} type="submit" className="btn btn-primary mb-3">
          Sing In
        </button>
        <div className="mb-3" style={{fontSize:"1.2rem"}}>
          Don't have an Account? <Link to={`/register?redirect=${redirect}`} style={{textDecoration:"none"}}>Click hear</Link>
        </div>
      </form>
    </div>
        )}
    </div>
  );
};

export default SigninScreen;
