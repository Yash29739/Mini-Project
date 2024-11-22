"use client";

import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "@/components/LoadingSpinner";

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const regexPatterns = {
    username: /^[a-zA-Z0-9_]{3,}$/,
    password: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9.+_%]{6,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  };

  const validateInput = (): string | null => {
    const { username, email, newPassword } = formData;

    if (!regexPatterns.username.test(username)) {
      return "Username must be at least 3 characters long and alphanumeric.";
    }
    if (!regexPatterns.email.test(email)) {
      return "Invalid email format.";
    }
    if (!regexPatterns.password.test(newPassword)) {
      return "Password must be at least 6 characters long, with at least one letter and one number.";
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationError = validateInput();

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://digital-detox-y73b.onrender.com/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Password reset successful!");
        router.push("/login");
      } else {
        toast.error(result.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[450px] p-6 bg-white shadow-lg rounded-xl">
        <ToastContainer />
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
              value={formData.username}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              className="w-full h-[50px] bg-transparent outline-none border border-gray-300 rounded-full text-lg p-5 pr-12"
            />
            <MdEmail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* New Password Input */}
          <div className="relative mb-5">
            <label htmlFor="newPassword" className="sr-only">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter a new password"
              required
              className="w-full h-[50px] bg-transparent outline-none border border-gray-300 rounded-full text-lg p-5 pr-12"
            />
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            disabled={loading}
            onClick={handleReset}
            className={`w-full h-[45px] text-white bg-blue-600 hover:bg-blue-500 font-bold rounded-full text-lg ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
          >
            {loading ? <LoadingSpinner/> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;