import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../Redux/user/user.slice";

function Navbar() {

  const Dispatch = useDispatch()
  const handleLogout = async () => {
      try {
          const res = await axios.post('/api/auth/signOut')
          Dispatch (signOutSuccess())
      } catch (error) {
        console.log(error)
      }
  };
  return (
    <nav className="bg-gray-900">
      <div className="flex max-w-screen-2xl font-serif justify-between  py-5 items-center    mx-auto lg:flex-row">
        <div>
          <h3 className="text-3xl ml-5 md:ml-4 font-bold cursor-pointer justify-center text-center text-white ">
            Shopify
          </h3>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="mr-6 font-mono md:mr-0  btn  bg-white text-black hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
