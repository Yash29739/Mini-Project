"use client";
import { useLogin } from "@/context/LoginContext";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogIn = () => {
  const [action, setAction] = useState("");
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useLogin();
  const router = useRouter();

  // Regex patterns for validation
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9.+_%]{6,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation Function
  const validate = (type: string) => {
    if (type === "signup") {
      if (!usernameRegex.test(signupData.username)) {
        return "Username must be at least 3 characters long and alphanumeric.";
      }
      if (!emailRegex.test(signupData.email)) {
        return "Invalid email format.";
      }
      if (!passwordRegex.test(signupData.password)) {
        return "Password must be at least 6 characters long, with at least one letter and one number.";
      }
    } else if (type === "login") {
      if (!usernameRegex.test(loginData.username)) {
        return "Username must be at least 3 characters long and alphanumeric.";
      }
      if (!passwordRegex.test(loginData.password)) {
        return "Password must be at least 6 characters long, with at least one letter and one number.";
      }
    }
    return null;
  };

  // Toggle between login and signup form
  const registerLink = () => setAction("active");
  const logInLink = () => setAction("");

  // Handle Signup Form Submission
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const error = validate("signup");
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://digital-detox-y73b.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(signupData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Sign-up successful!");
        setAction("");
      } else {
        toast.error(result.message || "Signup error");
      }
    } catch (error) {
      toast.error("An error occurred: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const error = validate("login");
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://digital-detox-y73b.onrender.com/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Login successful!");
        setIsLoggedIn(true);

        // Store login state in local storage with an expiry time
        const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 1 day in milliseconds
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('loginExpiry', JSON.stringify(expiryTime));

        router.push("/"); // Redirect to home page
      } else {
        toast.error(result.message || "Login error");
      }
    } catch (error) {
      toast.error("An error occurred: " + error);
    } finally {
      setLoading(false);
    }
  };


  // Handle Input Changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`relative w-[500px] ${action === "active" ? "h-[750px]" : "h-[700px]"
        } bg-transparent backdrop-blur-lg rounded-[10px] flex items-center transition-all ease-in-out duration-500 overflow-hidden text-black`}
    >
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Login Form */}
      <div
        className={`w-full p-10 ${action === "active" ? "translate-x-[-600px]" : "translate-x-0"
          } transition-transform duration-500 ease-in-out`}
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
              className="w-full h-[50px] bg-transparent outline-none border border-[3px] border-gray-300 rounded-full text-[15px] p-1 pl-5"
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
              className="w-full h-[50px] bg-transparent outline-none border border-[3px] border-gray-300 rounded-full text-[15px] p-5 pl-5"
            />
          </div>
          <div className="flex justify-between text-[12px] mb-6">
            <label>
              <input type="checkbox" className="accent-white mr-2" /> Remember Me
            </label>
            <Link href="/ForgotPassword" className="text-black hover:underline cursor-pointer">
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
              <a href="#" onClick={registerLink} className="text-black font-semibold hover:underline">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Signup Form */}
      <div
        className={`absolute w-full p-10 ${action === "active" ? "translate-x-0" : "translate-x-[600px]"
          } transition-transform duration-500 ease-in-out`}
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
              className="w-full h-[50px] bg-transparent outline-none border border-[3px] border-gray-300 rounded-full text-[15px] p-5 pl-5"
            />
            <FaUser className="absolute right-4 top-6 transform -translate-y-1/2 text-[18px]" />
          </div>
          <div className="relative w-full h-[40px] my-10">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupChange}
              required
              className="w-full h-[50px] bg-transparent outline-none border border-[3px] border-gray-300 rounded-full text-[15px] p-5 pl-5"
            />
            <MdEmail className="absolute right-4 top-6 transform -translate-y-1/2 text-[18px]" />
          </div>
          <div className="relative w-full h-[40px]">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
              className="w-full h-[50px] bg-transparent outline-none border border-[3px] border-gray-300 rounded-full text-[15px] p-5 pl-5"
            />
          </div>
          <button
            type="submit"
            className="w-full h-[45px] mt-10 text-white bg-black border-2 border-gray-400 shadow-md cursor-pointer font-bold rounded-full text-[15px] hover:scale-105 transition-transform duration-300"
          >
            {loading ? <LoadingSpinner /> : "Sign Up"}
          </button>
          <div className="text-[13px] text-center my-7">
            <p>
              Already have an Account?{" "}
              <a href="#" onClick={logInLink} className="text-black font-semibold hover:underline">
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
