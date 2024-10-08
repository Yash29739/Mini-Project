"use client"

import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router=useRouter();
  const handleReset=()=>{
    try {
      alert("The Password has been reset \nNow You can Log-In!! ")
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-center items-center m-[200px]">
      <div className="w-[450px]">
        <form >
          <h1 className="text-[45px] text-center text-black-500 font-bold font-serif">
            Forgot Password!!
          </h1>
          <div className="relative w-full h-[70px] my-2">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className="w-full h-[50px] bg-transparent outline-none border border-[3px] border-[#2c2c2c1a] rounded-full text-[20px] p-5 pl-5"
            />
            <FaUser className="absolute right-4 top-6 transform -translate-y-1/2 text-[18px]" />
          </div>
          <div className="relative w-full h-[70px] my-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full h-[50px] bg-transparent outline-none border border-[3px] border-[#2c2c2c1a] rounded-full text-[18px] p-5 pl-5"
            />
            <MdEmail className="absolute right-4 top-6 transform -translate-y-1/2 text-[18px]" />
          </div>
          <div className="relative w-full h-[70px] my-2">
          <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full h-[50px] bg-transparent outline-none border border-[3px] border-[#2c2c2c1a] rounded-full text-[18px] p-5 pl-5"
            />
            </div>
          <button
            type="submit"
            className="w-full h-[45px]  text-white bg-black border-2 border-gray-400 shadow-md cursor-pointer font-bold rounded-full text-[15px] hover:scale-105 transition-transform duration-300"
            onClick={handleReset}
          >
            Reset Password
          </button>
          <div className="text-[20px] text-center my-7"></div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;