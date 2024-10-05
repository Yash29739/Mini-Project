"use client";

import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LogIn = () => {
  const [action, setAction] = useState("");
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  // Toggle between login and signup form
  const registerLink = () => setAction("active");
  const logInLink = () => setAction("");

  // Handle signup form submission
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Entered the Sign-Up function");

    try {
      const response = await fetch(
        "https://digital-detox-y73b.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(signupData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Signup successful:", result);
        alert("SignUp successful");
        setAction("")
      } else {
        console.error("Signup error:", result.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Handle login form submission
  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Entered the Log-In function");

    try {
      const response = await fetch(
        "https://digital-detox-y73b.onrender.com/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(loginData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Login successful:", result);
        alert("Login successful");
        router.push("/");
      } else {
        console.error("Login error:", result.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Handle input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`relative w-[600px] ${
        action === "active" ? "h-[750px]" : "h-[600px]"
      } bg-transparent backdrop-blur-lg rounded-[10px] flex items-center transition-all ease-in-out duration-[1500ms] overflow-hidden text-black`}
    >
      {/* Login Form */}
      <div
        className={`w-full p-10 ${
          action === "active" ? "translate-x-[-600px]" : "translate-x-0"
        } transition-transform duration-[1500ms] ease-in-out`}
      >
        <form onSubmit={handleLogIn}>
          <h1 className="text-[56px] text-center font-semibold font-serif">Log-In</h1>
          <div className="relative w-full h-[70px] my-12">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleLoginChange}
              required
              className="w-full h-full bg-transparent outline-none border border-[3px] border-[#2c2c2c1a] rounded-full text-[20px] p-5 pl-5"
            />
            <FaUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[25px]" />
          </div>
          <div className="relative w-full h-[70px] my-12">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              className="w-full h-full bg-transparent outline-none border border-[3px] border-[#2c2c2c1a] rounded-full text-[20px] p-5 pl-5"
            />
            <FaLock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[25px]" />
          </div>
          <div className="flex justify-between text-[20px] mb-6">
            <label>
              <input type="checkbox" className="accent-white mr-2" /> Remember
              Me
            </label>
            <Link href="/ForgotPassword" className="text-black hover:underline cursor-pointer">
               Forgot password?
            </Link>

          </div>
          <button
            type="submit"
            className="w-full h-[65px]  text-white bg-black border-2 border-gray-400 shadow-md cursor-pointer font-bold rounded-full text-[25px] hover:scale-105 transition-transform duration-300"
          >
            LogIn
          </button>
          <div className="text-[20px] text-center my-7">
            <p>
              Don't have an Account?{" "}
              <a
                href="#"
                onClick={registerLink}
                className="text-black font-semibold hover:underline"
              >
                Register
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Signup Form */}
      <div
        className={`absolute w-full p-10 ${
          action === "active" ? "translate-x-0" : "translate-x-[600px]"
        } transition-transform duration-[1500ms] ease-in-out`}
      >
        <form onSubmit={handleSignUp}>
          <h1 className="text-[56px] text-center font-bold font-serif">Sign-Up</h1>
          <div className="relative w-full h-[70px] my-12">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={signupData.username}
              onChange={handleSignupChange}
              required
              className="w-full h-full bg-transparent outline-none border border-[3px] border-[#2c2c2c1a] rounded-full text-[20px] p-5 pl-5"
            />
            <FaUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[25px]" />
          </div>
          <div className="relative w-full h-[70px] my-12">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupChange}
              required
              className="w-full h-full bg-transparent outline-none border border-[3px] border-[#2c2c2c1a] rounded-full text-[20px] p-5 pl-5"
            />
            <MdEmail className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[25px]" />
          </div>
          <div className="relative w-full h-[70px] my-12">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
              className="w-full h-full bg-transparent outline-none border border-[3px] border-[#2c2c2c1a] rounded-full text-[20px] p-5 pl-5"
            />
            <FaLock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[25px]" />
          </div>
          <div className="flex justify-between text-[20px] mb-6">
            <label>
              <input type="checkbox" className="accent-white mr-2" /> I agree to
              the terms & conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full h-[65px] bg-black border-2 border-gray-400 shadow-md cursor-pointer text-white font-bold rounded-full text-[25px] hover:scale-105 transition-transform duration-300"
          >
            SignUp
          </button>
          <div className="text-[20px] text-center my-7">
            <p>
              Have an Account Already?{" "}
              <a
                href="#"
                onClick={logInLink}
                className="text-black font-semibold hover:underline"
              >
                Log-In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
