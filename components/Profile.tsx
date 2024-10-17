import Image from "next/image";
import React from "react";
import profile from "../public/profile.png"; // Ensure the image path is correct.

const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Profile Picture */}
      <div className="rounded-full w-[10rem] h-[10rem] flex justify-center items-center border-2 border-red-500 overflow-hidden">
        <Image alt="Profile_img" src={profile} className="rounded-full" />
      </div>

      {/* User Info */}
      <div className="text-center mt-4">
        <h1 className="text-2xl font-semibold text-gray-800">User Name</h1>
        <p className="text-gray-600">Full Stack Developer</p>
      </div>

      {/* About Section */}
      <div className="mt-6 text-center max-w-[30rem]">
        <h2 className="text-xl font-medium text-gray-700">About Me</h2>
        <p className="text-gray-500 mt-2">
          Passionate developer with experience in building web applications using Next.js and React. I love creating
          responsive, accessible, and user-friendly applications.
        </p>
      </div>

      {/* Profile Details */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center space-x-4">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-600">johndoe@example.com</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-medium text-gray-700">Location:</span>
          <span className="text-gray-600">San Francisco, CA</span>
        </div>
      </div>

      {/* logout Button */}
      <div className="mt-6 ">
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
