import { Link } from "react-router-dom"

const Signup = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold text-3xl my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="username" id="username" className="bg-slate-100 p-3 rounded-lg text-lg" />
        <input type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg text-lg" />
        <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg text-lg" />
        <button className="bg-slate-700 p-3 rounded-lg text-lg text-white uppercase font-medium hover:opacity-95">Sign Up</button>
      </form>
      <div className="flex gap-2 mt-1">
        <p>Have an account?</p>
        <span className="text-blue-500">
          <Link to="/sign-in">Sign in</Link>
        </span>
      </div>
    </div>
  )
}

export default Signup