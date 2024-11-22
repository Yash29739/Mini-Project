"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useLogin } from "@/context/LoginContext";

interface User {
  username: string;
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>({
    username: "User Name",
    email: "johndoe@example.com",
  });
  const { isLoggedIn, setIsLoggedIn, logout } = useLogin();

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);

  // Fetch user details on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("https://digital-detox-y73b.onrender.com/auth", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          setUser(result.foundUser);
        } else {
          const error = await response.json();
          toast.error(error.message || "Login error");
        }
      } catch (error) {
        toast.error("An error occurred: " + error);
      }
    };
    fetchUserDetails();
  }, []);

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedUser(user);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Save edited profile details
  const handleSave = async () => {
    try {
      const response = await fetch("https://digital-detox-y73b.onrender.com/auth", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        toast.success("Profile updated successfully!");
        setUser(editedUser);
        setIsEditing(false);
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred: " + error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e7f0fd]">
      <div className="bg-white shadow-lg rounded-lg p-8 mx-4 max-w-lg">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="rounded-full w-40 h-40 bg-blue-200 flex justify-center items-center border-4 border-blue-300 overflow-hidden mb-6">
            <p className="text-[100px] font-serif text-[#1e3a8a] font-bold">{user.username[0]}</p>
          </div>

          {/* User Info */}
          <div className="w-full">
            {isEditing ? (
              <>
                <div className="flex items-center mb-4">
                  <FaUserCircle className="text-blue-600 mr-2" />
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 w-full focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center mb-6">
                  <FaEnvelope className="text-blue-600 mr-2" />
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 w-full focus:border-blue-500"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center mb-4">
                  <FaUserCircle className="text-blue-600 mr-2" />
                  <span className="text-lg font-semibold text-gray-800">Name: {user.username}</span>
                </div>
                <div className="flex items-center mb-6">
                  <FaEnvelope className="text-blue-600 mr-2" />
                  <span className="text-lg font-semibold text-gray-800">Email: {user.email}</span>
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Edit Profile
                </button>
              )}
              <button 
                onClick={() => {
                  logout();
                }}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                >
                LogOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
