"use client";

import { useLogin } from "@/context/LoginContext";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogIn = () => {
  const [formType, setFormType] = useState<"login" | "signup">("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useLogin();
  const router = useRouter();

  const regexPatterns = {
    username: /^[a-zA-Z0-9_]{3,}$/, // At least 3 characters, alphanumeric
    password: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9.+_%]{6,}$/, // 6+ characters, with letters and numbers
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valid email format
  };

  const validateInput = (): string | null => {
    const { username, email, password } = formData;

    if (!regexPatterns.username.test(username)) {
      return "Username must be at least 3 characters long and alphanumeric.";
    }
    if (formType === "signup" && !regexPatterns.email.test(email)) {
      return "Invalid email format.";
    }
    if (!regexPatterns.password.test(password)) {
      return "Password must be at least 6 characters long, with at least one letter and one number.";
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const error = validateInput();
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    const endpoint = formType === "login" ? "/auth" : "/register";
    const url = `https://digital-detox-y73b.onrender.com${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(`${formType === "login" ? "Login" : "Sign-up"} successful!`);
        if (formType === "login") {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("loginExpiry", `${Date.now() + 24 * 60 * 60 * 1000}`);
          router.push("/");
        } else {
          setFormType("login");
        }
      } else {
        toast.error(result.message || `${formType === "login" ? "Login" : "Signup"} error`);
      }
    } catch (err) {
      toast.error(`An error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-[500px] h-[700px] bg-transparent backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center transition-all duration-500 overflow-hidden text-black">
      <ToastContainer />

      <h1 className="text-3xl font-bold text-center underline font-serif mb-8">
        {formType === "login" ? "Log In" : "Sign Up"}
      </h1>

      <form onSubmit={handleSubmit} className="w-full px-8 space-y-6">
        <div className="relative">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full h-12 px-5 bg-transparent border-2 border-gray-300 rounded-full outline-none"
          />
          <FaUser className="absolute right-4 top-3 text-gray-400" />
        </div>

        {formType === "signup" && (
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full h-12 px-5 bg-transparent border-2 border-gray-300 rounded-full outline-none"
            />
            <MdEmail className="absolute right-4 top-3 text-gray-400" />
          </div>
        )}

        <div className="relative">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full h-12 px-5 bg-transparent border-2 border-gray-300 rounded-full outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 text-white bg-blue-600 hover:bg-blue-500 border-2 border-gray-400 rounded-full flex justify-center items-center"
        >
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="text-white" />
              <span className="ml-2">{formType === "login" ? "Logging-In...":"Registering..."}</span>
            </>
          ) : (
            formType === "login" ? "Log In" : "Sign Up"
          )}
        </button>
      </form>

      <div className="mt-6 text-sm text-center">
        {formType === "login" ? (
          <>
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setFormType("signup")}
                className="font-semibold text-blue-500 hover:underline"
              >
                Register
              </button>
            </p>
            <Link href="/ForgotPassword" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setFormType("login")}
              className="font-semibold text-blue-500 hover:underline"
            >
              Log In
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LogIn;
