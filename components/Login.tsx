// LogIn.jsx

"use client";
import { useLogin } from "@/context/LoginContext";
import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner"; // Import the loading spinner component

const LogIn = () => {
  const [action, setAction] = useState("");
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const { setIsLoggedIn } = useLogin();
  const router = useRouter();

  // Toggle between login and signup form
  const registerLink = () => setAction("active");
  const logInLink = () => setAction("");

  // Handle signup form submission
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when signup starts

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
        alert("SignUp successful");
        setAction("");
      } else {
        console.error("Signup error:", result.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false); // Set loading state to false when signup is done
    }
  };

  // Handle login form submission
  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when login starts

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
        alert("Login successful");
        setIsLoggedIn(true);
        router.push("/");
      } else {
        console.error("Login error:", result.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false); // Set loading state to false when login is done
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
      className={`relative w-[500px] ${
        action === "active" ? "h-[750px]" : "h-[700px]"
      } bg-transparent backdrop-blur-lg rounded-[10px] flex items-center transition-all ease-in-out duration-[1500ms] overflow-hidden text-black`}
    >
      {/* Login Form */}
      <div
        className={`w-full p-10 ${
          action === "active" ? "translate-x-[-600px]" : "translate-x-0"
        } transition-transform duration-[1500ms] ease-in-out`}
      >
        <form onSubmit={handleLogIn}>
          <h6 className="text-[35px] text-center font-semibold underline font-serif">
            Log-In
          </h6>
          <div className="relative w-full h-[40px] my-10">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleLoginChange}
              required
              className="w-full h-[50px] bg-transparent outline-none border border-[3px] border-[#2c2c2c1a] rounded-full text-[15px] p-1 pl-5"
            />
            <FaUser className="absolute right-4 top-6 transform -translate-y-1/2 text-[18px]" />
          </div>
          <div className="relative w-full h-[70px] ">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              className="w-full h-[50px] bg-transparent outline-none border border-[3px] border-[#2c2c2c1a] rounded-full text-[15px] p-5 pl-5"
            />
          </div>
          <div className="flex justify-between text-[12px] mb-6">
            <label>
              <input type="checkbox" className="accent-white mr-2" /> Remember
              Me
            </label>
            <Link
              href="/ForgotPassword"
              className="text-black hover:underline cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full h-[45px] text-white bg-black border-2 border-gray-400 shadow-md cursor-pointer font-bold rounded-full text-[15px] hover:scale-105 transition-transform duration-300"
          >
            {loading ? <LoadingSpinner /> : "Log In"}
          </button>
          <div className="text-[13px] text-center my-7">
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
          <h1 className="text-[35px] text-center font-bold underline font-serif">
            Sign-Up
          </h1>
          <div className="relative w-full h-[40px] my-10">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={signupData.username}
              onChange={handleSignupChange}
              required
              className="w-full h-[50px] bg-transparent outline-none border border-[3px] border-[#2c2c2c1a] rounded-full text-[15px] p-5 pl-5"
            />
            <FaUser className="absolute right-4 top-6 transform -translate-y-1/2 text-[18px]" />
          </div>
          <div className="relative w-full h-[50px] my-8">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupChange}
              required
              className="w-full h-full bg-transparent outline-none border border-[3px] border-[#2c2c2c1a] rounded-full text-[15px] p-5 pl-5"
            />
            <MdEmail className="absolute right-4 top-6 transform -translate-y-1/2 text-[18px]" />
          </div>
          <div className="relative w-full h-[70px] ">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
              className="w-full h-[50px] bg-transparent outline-none border border-[3px] border-[#2c2c2c1a] rounded-full text-[15px] p-5 pl-5"
            />
          </div>
          <div className="flex justify-between text-[12px] mb-5">
            <label>
              <input type="checkbox" className="accent-white mr-1" /> I agree to
              the terms & conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full h-[45px] text-white bg-black border-2 border-gray-400 shadow-md cursor-pointer font-bold rounded-full text-[15px] hover:scale-105 transition-transform duration-300"
          >
            {loading ? <LoadingSpinner /> : "Sign Up"}
          </button>
          <div className="text-[13px] text-center my-7">
            <p>
              Already have an Account?{" "}
              <a
                href="#"
                onClick={logInLink}
                className="text-black font-semibold hover:underline"
              >
                Log In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
