"use client";
import Image from "next/image";
import { useLogin } from "@/context/LoginContext";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu

  const { isLoggedIn,logout } = useLogin();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flexBetween max-container w-full padding-container relative z-30 bg-black">
      <Link href="/" aria-label="Home" >
        <Image src="/logo.png" alt="logo" className="rounded-3xl" width={14} height={59} />
      </Link>

      <ul
        className={`md:flex h-full hidden gap-8 ${
          isMenuOpen ? "flex" : "hidden"
        } md:items-center`}
      >
        <li>
          <Link
            href="/"
            className="regular-16 text-white flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/schedules"
            className="regular-16 text-white flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            Schedules
          </Link>
        </li>
        <li>
          <Link
            href="/resources"
            className="regular-16 text-white flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            Resources
          </Link>
        </li>
        <li>
          <Link
            href="/tracker"
            className="regular-16 text-white flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            Tracker
          </Link>
        </li>

        <li>
          {isLoggedIn ?  (
            // Render profile icon and logout when logged in
            <div className="flex items-center">
              <Link href="/profile">
                <button
                  className="flexCenter gap-2 px-5 py-2 hover:border-white border-none  bg-green-700 text-white rounded-2xl border "
                  type="button"
                >
                  <Image src="/user.svg" alt="Profile" width={20} height={20} />
                  <label className="bold-10 whitespace-nowrap cursor-pointer">
                    Profile
                  </label>
                </button>
              </Link>
              <button
                onClick={logout} // Call logout function on click
                className="ml-4 flexCenter gap-2 px-5 py-2 border-red-600 hover:border-white hover:bg-red-600 bg-red-700 text-white rounded-2xl border btn"
              >
                <Image src="logout.svg" alt="Logout" width={20} height={20} />
                <label className="bold-10 whitespace-nowrap cursor-pointer">
                  Logout
                </label>
              </button>
            </div>
          ): (
            // Render login button when not logged in
            <Link href="/login">
              <button
                className="flexCenter gap-2 px-3 py-2  hover:border-red-50  bg-green-700 text-white rounded-2xl border btn"
                type="button"
              >
                <Image src="/user.svg" alt="Login" width={20} height={14} />
                <label className="bold-10 whitespace-nowrap cursor-pointer">
                  LogIn
                </label>
              </button>
            </Link>
          )}
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle Menu"
        className="md:hidden"
      >
        <Image
          src="/menu.svg"
          alt="menu"
          width={32}
          height={32}
          className="inline-block cursor-pointer"
        />
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-14 text-white right-0 bg-gray-800 mt-[30px] shadow-lg rounded-lg z-50">
          <ul className="flex flex-col p-4 ">
            <li>
              <Link
                href="/"
                className="text-white py-2 block hover:bg-gray-700 hover:rounded-lg p-[20px] transition-all"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/schedules"
                className="text-white py-2 block hover:bg-gray-700 hover:rounded-lg p-[20px] transition-all"
                onClick={toggleMenu}
              >
                Schedules
              </Link>
            </li>
            <li>
              <Link
                href="/resources"
                className="text-white py-2 block hover:bg-gray-700 hover:rounded-lg p-[20px] transition-all"
                onClick={toggleMenu}
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                href="/tracker"
                className="text-white py-2 block hover:bg-gray-700 hover:rounded-lg p-[20px] transition-all"
                onClick={toggleMenu}
              >
                Tracker
              </Link>
            </li>
            <li className="flex flex-col justify-center">
              {isLoggedIn ?  (
                // Render profile icon and logout button when logged in
                <div className="flex flex-col">
                  <Link href="/profile" className="text-white py-2 block hover:bg-gray-700 hover:rounded-lg p-[20px] transition-all">
                  <div className="flex gap-2">
                      <Image src="/user.svg" alt="Logout" width={20} height={20} />
                      <label className="bold-10 whitespace-nowrap cursor-pointer">
                        Profile
                      </label>
                    </div>
                  </Link>
                  <button
                    onClick={logout} // Call logout function on click
                    className="text-white py-2 block hover:bg-red-600 hover:rounded-lg p-[20px] transition-all"
                  >
                    <div className="flex gap-2">
                      <Image src="/logout.svg" alt="Logout" width={20} height={20} />
                      <label className="bold-10 whitespace-nowrap cursor-pointer">
                        Logout
                      </label>
                    </div>
                  </button>
                </div>
              ) : (
                // Render login button when not logged in
                <Link href="/login" className=" hover:bg-green-600 text-white py-2 block hover:rounded-lg p-[20px] transition-all">
                    <div className="flex gap-2">
                      <Image src="/user.svg" alt="Logout" width={20} height={20} />
                      <label className="bold-10 whitespace-nowrap cursor-pointer">
                        Login
                      </label>
                    </div>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
