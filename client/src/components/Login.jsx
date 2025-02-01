import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      return navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleLogin}>
        <fieldset className="fieldset w-xs bg-base-300 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend text-2xl">Login</legend>

          <label className="fieldset-label mt-2 px-2">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="input rounded-full"
            placeholder="Email"
          />

          <label className="fieldset-label mt-2 px-2">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="input rounded-full"
            placeholder="Password"
          />

          <p className="text-red-400">{error}</p>
          <button className="btn btn-accent mt-5 rounded-full">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
