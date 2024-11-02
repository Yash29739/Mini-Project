"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import profile from "../public/profile.png"; // Ensure the image path is correct.
import { toast } from "react-toastify";

const Profile = () => {
  // State to hold user details
  const [user, setUser] = useState({
    username: "User Name",
    email: "johndoe@example.com",
  })

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      console.log("Entered the get function");
      
      try {
        const response = await fetch("https://digital-detox-y73b.onrender.com/auth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        });
  
        const result = await response.json();
        console.log(result);
        
        if (response.ok) {
          setUser(result.foundUser)
        } else {
          toast.error(result.message || "Login error");
        }
      } catch (error) {
        toast.error("An error occurred: " + error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Profile Picture */}
      <div className="rounded-full w-[10rem] h-[10rem] flex justify-center items-center border-2 border-red-500 overflow-hidden">
        <Image alt="Profile_img" src={profile} className="rounded-full" />
      </div>

      {/* User Info */}

      {/* Profile Details */}
      <div className="mt-5 space-y-4 flex flex-col items-center">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{user.username}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{user.email}</span>
        </div>
      </div>

      {/* Edit Profile and Logout Buttons */}
      <div className="mt-6">
        <button className="mx-2 px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md">
          Edit Profile
        </button>
        <button className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md">
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Profile;