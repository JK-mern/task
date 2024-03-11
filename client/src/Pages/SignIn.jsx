import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signInSucces } from "../Redux/user/user.slice";
import {  useDispatch, useSelector } from "react-redux";

function SignIn() {
  const Dispatch = useDispatch()
  const navigate =useNavigate()
  const {currentUser} = useSelector((state) =>state.user)
  const [selectedRole, setSelectedRole] = useState("user");
  const [formData, setFormData] = useState({});

  const setRole = (e) => {
    setSelectedRole(e.target.id);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedRole === "user") {
      try {
        const res = await axios.post("/api/auth//userLogin", formData);
        const data = res.data
        Dispatch(signInSucces(data))
        navigate('/home')
        
      } catch (error) {
        console.log(error);
      }
    } else if (selectedRole === "seller") {
      try {
        const res = await axios.post("/api/auth/sellerLogin", formData);
        const data = res.data
        Dispatch(signInSucces(data))
        navigate('/home')
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main>
      <div className="flex  max-w-6xl  mx-auto flex-col justify-center items-center h-screen">
        <h1 className="font-bold text-white text-3xl">Login</h1>
        <div>
          <div className="flex gap-4     m-7  items-center  justify-center">
            <button
              className={`btn  ml-6 px-10  md:btn-wide ${
                selectedRole === "user" ? "bg-white text-black" : ""
              }`}
              id="user"
              onClick={setRole}
            >
              User Login
            </button>
            <button
              className={`btn  px-10 md:btn-wide ${
                selectedRole === "seller" ? "bg-white text-black" : ""
              }`}
              id="seller"
              onClick={setRole}
            >
              Seller Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
           
            <div>
              <input
                className=" m-2 rounded-lg p-4  ml-8  w-80  md:w-full text-white text-sm focus:outline-none focus:ring focus:ring-zinc-700"
                type="email"
                name=""
                id="email"
                placeholder="email"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className=" m-2 rounded-lg p-4  ml-8  w-80  md:w-full text-white text-sm focus:outline-none focus:ring focus:ring-zinc-700 "
                type="password"
                name=""
                id="password"
                placeholder="password"
                required
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-primary ml-8   w-80 md:w-full "> Sign In</button>
          </form>
          <div className="mt-8  md:ml-10  flex gap-6 text-center justify-center">
            <h3>Don't have an account ? </h3>
            <Link to="/">Sign Up</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
