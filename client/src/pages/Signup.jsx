import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import Oauth from "../components/Oauth";

const Signup = () => {

  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormdata({...formdata, [e.target.id] : e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/sign-up', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formdata),
      });
      const data = await res.json();
      setLoading(false);
      setError(false);
      navigate('/');
      
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold text-3xl my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="username" id="username" className="bg-slate-100 p-3 rounded-lg text-lg" onChange={changeHandler}/>
        <input type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg text-lg" onChange={changeHandler}/>
        <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg text-lg" onChange={changeHandler}/>
        <button disabled={loading} className="bg-slate-700 p-3 rounded-lg text-lg text-white uppercase font-medium hover:opacity-95">{loading ? "Loading..." : "Sign Up"}</button>
        <Oauth/>
      </form>
      <div className="flex gap-2 mt-1">
        <p>Have an account?</p>
        <span className="text-blue-500">
          <Link to="/sign-in">Sign in</Link>
        </span>
      </div>
      <div>
        <p className="mt-3 text-red-600 text-center">{error && "Something went wrong!"}</p>
      </div>
    </div>
  )
}

export default Signup