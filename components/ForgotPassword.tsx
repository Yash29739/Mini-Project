"use client";

import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      alert("The password has been reset.\nYou can now log in!");
      router.push("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred while resetting the password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[450px] p-6 bg-white shadow-lg rounded-xl">
        <form>
          <h1 className="text-4xl text-center font-bold font-serif mb-6 text-gray-800">
            Forgot Password
          </h1>

          {/* Username Input */}
          <div className="relative mb-5">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              className="w-full h-[50px] bg-transparent outline-none border border-gray-300 rounded-full text-lg p-5 pr-12"
            />
            <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Email Input */}
          <div className="relative mb-5">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="w-full h-[50px] bg-transparent outline-none border border-gray-300 rounded-full text-lg p-5 pr-12"
            />
            <MdEmail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Password Input */}
          <div className="relative mb-5">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a new password"
              required
              className="w-full h-[50px] bg-transparent outline-none border border-gray-300 rounded-full text-lg p-5 pr-12"
            />
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            className="w-full h-[45px] text-white bg-black font-bold rounded-full text-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-400 focus:outline-none shadow-md transition-transform duration-300"
            onClick={handleReset}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;