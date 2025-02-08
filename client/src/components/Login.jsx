import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../app/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/constants";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("tony@gmail.com");
  const [password, setPassword] = useState("StrongPassword123!");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
      dispatch(addUser(res.data.data));
      toast.success(res.data.message);
      return navigate("/");
    } catch (error) {
      setError(error.response?.data || "An error occurred. Please try again.");
      toast.error(err.response?.data?.message || "Failed to login!");
    }
  };

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(
        `${BACKEND_URL}/api/auth/signup`,
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      toast.success(res.data.message);
      return navigate("/profile");
    } catch (error) {
      setError(error.response?.data || "An error occurred. Please try again.");
      toast.error(err.response?.data?.message || "Failed to sign up!");
    }
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <form onSubmit={isLoggedIn ? handleLogin : handleSignUp}>
          <fieldset className="fieldset w-xs bg-base-300 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend text-2xl">
              {isLoggedIn ? "Login" : "Sign Up"}
            </legend>

            {!isLoggedIn && (
              <>
                {" "}
                <label className="fieldset-label mt-2 px-2">First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="input rounded-full"
                  placeholder="First Name"
                />
                <label className="fieldset-label mt-2 px-2">Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="input rounded-full"
                  placeholder="First Name"
                />{" "}
              </>
            )}

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
            <button className="btn btn-accent mt-5 rounded-full text-black">
              {isLoggedIn ? "Login" : "Create Account"}
            </button>

            <p
              onClick={() => setIsLoggedIn((value) => !value)}
              className="p-2 text-blue-300 cursor-pointer"
            >
              {isLoggedIn
                ? "Don't have an account? Sign up"
                : "Already have an account? Log in"}
            </p>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default Login;
