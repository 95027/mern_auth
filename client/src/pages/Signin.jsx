import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signinFailure, signinStart, signinSuccess } from "../redux/user/userSlice";
import Oauth from "../components/Oauth";

const Signin = () => {

  const [formdata, setFormdata] = useState({});

  // getting initial state from userslice
  const {loading, error} = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setFormdata({...formdata, [e.target.id] : e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signinStart());
      const res = await fetch('/api/auth/sign-in', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formdata),
      });
      const data = await res.json();
      
      if(data.success === false){
        dispatch(signinFailure(data));
        return;
      }

      dispatch(signinSuccess(data));

      navigate('/');
      
    } catch (error) {
      dispatch(signinFailure(error));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold text-3xl my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg text-lg" onChange={changeHandler}/>
        <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg text-lg" onChange={changeHandler}/>
        <button disabled={loading} className="bg-slate-700 p-3 rounded-lg text-lg text-white uppercase font-medium hover:opacity-95">{loading ? "Loading..." : "Sign In"}</button>
        <Oauth/>
      </form>
      <div className="flex gap-2 mt-1">
        <p>dont have an account?</p>
        <span className="text-blue-500">
          <Link to="/sign-up">Sign up</Link>
        </span>
      </div>
      <div>
        <p className="mt-3 text-red-600 text-center">{error ?  error.message || "Something went wrong!" : ""}</p>
      </div>
    </div>
  )
}

export default Signin