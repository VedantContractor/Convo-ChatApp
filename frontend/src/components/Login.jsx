import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://`${import.meta.env.VITE_API_URL}`/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      navigate("/");
      
    
      dispatch(setAuthUser(res.data));

    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <div
      className="flex min-h-screen min-w-96 mx-auto items-center justify-center px-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.15)), url('/bg.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-sm rounded-lg border border-white/20 bg-white/10 p-6 shadow-md backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-black">Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Username"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Password "
            />
          </div>

          <p className="text-center my-2">
            Don't have an account?
            <Link to="/signup">Signup</Link>
          </p>

          <div>
            <button
              type="submit"
              className="btn btn-block bg-primary btn-sm mt-2 border-rounded border-slate-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
