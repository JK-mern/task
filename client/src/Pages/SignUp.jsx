import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorComponent from "../components/ErrorComponent";

function SignUp() {
  const [selectedRole, setSelectedRole] = useState("user");
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
        const res = await axios.post("/api/auth//signupUser", formData);
        if (res.status === 200) navigate("/signin");
      } catch (error) {
        setErrorMessage(error.response.data.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }
    } else if (selectedRole === "seller") {
      try {
        const res = await axios.post("/api/auth/signupSeller", formData);

        if (res.status === 200) navigate("/signin");
      } catch (error) {
        console.log("error appeared");
        setErrorMessage(error.response.data.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }
    }
  };

  return (
    <main>
      <div className="flex  max-w-6xl  mx-auto flex-col justify-center items-center h-screen">
        {errorMessage && <ErrorComponent message={errorMessage} />}
        <h1 className="font-bold text-white text-3xl">Register</h1>
        <div>
        <div className="flex gap-4     m-7  items-center  justify-center">
            <button
              className={`btn  ml-6 px-10  md:btn-wide hover:text-white ${
                selectedRole === "user" ? "bg-white text-black" : ""
              }`}
              id="user"
              onClick={setRole}
            >
              User Login
            </button>
            <button
              className={`btn  px-10 md:btn-wide hover:text-white ${
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
                className="m-2 rounded-lg p-4  ml-8  w-80  md:w-full text-white text-sm focus:outline-none focus:ring focus:ring-zinc-700"
                type="text"
                name=""
                id="username"
                placeholder="username"
                required
                onChange={handleChange}
              />
            </div>
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

            <button className="btn btn-primary ml-8   w-80 md:w-full ">
              {" "}
              Sign Up
            </button>
          </form>
          <div className="mt-8  md:ml-10  flex gap-6 text-center justify-center">
            <h3>Already have account ? </h3>
            <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUp;
