"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";

interface User {
  username: string;
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>({
    username: "User Name",
    email: "johndoe@example.com",
  });

  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [editedUser, setEditedUser] = useState<User>(user); // Temp state for editing

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("https://digital-detox-y73b.onrender.com/auth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const result = await response.json();

        if (response.ok) {
          setUser(result.foundUser);
        } else {
          toast.error(result.message || "Login error");
        }
      } catch (error) {
        toast.error("An error occurred: " + error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setEditedUser(user); // Reset edits when toggling
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log("Running Save");
    
    try {
      const response = await fetch("https://digital-detox-y73b.onrender.com/auth", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(editedUser),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!");
        setUser(editedUser); // Update the main user state
        setIsEditing(false); // Exit edit mode
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred: " + error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f4f8]">
      <div className="bg-white shadow-lg rounded-lg p-8 mx-4 max-w-lg">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="rounded-full w-[10rem] h-[10rem] bg-blue-50 flex justify-center items-center border-4 border-blue-200 overflow-hidden mb-6">
            <p className="text-[120px] font-serif text-[#00008b] font-bold">{user.username[0]}</p>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-start w-full">
            {isEditing ? (
              <>
                <div className="flex items-center mb-4">
                  <FaUserCircle className="text-gray-600 mr-2" />
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
                <div className="flex items-center mb-6">
                  <FaEnvelope className="text-gray-600 mr-2" />
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center mb-4">
                  <FaUserCircle className="text-gray-600 mr-2" />
                  <span className="text-lg font-semibold text-gray-800">Name: {user.username}</span>
                </div>
                <div className="flex items-center mb-6">
                  <FaEnvelope className="text-gray-600 mr-2" />
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
                    className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="px-6 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md transition duration-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200"
                >
                  Edit Profile
                </button>
              )}
              <button className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition duration-200">
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
