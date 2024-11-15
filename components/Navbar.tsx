"use client";
import Image from "next/image";
import { useLogin } from "@/context/LoginContext";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu
  const { isLoggedIn, setIsLoggedIn, logout } = useLogin(); // Destructure context values

  useEffect(() => {
    const isLoggedIn = JSON.parse(
      localStorage.getItem("isLoggedIn") || "false"
    );
    const expiry = JSON.parse(localStorage.getItem("loginExpiry") || "0");
    const currentTime = Date.now();

    if (isLoggedIn && currentTime < expiry) {
      setIsLoggedIn(true); // Set login state if still valid
    } else {
      localStorage.removeItem("isLoggedIn"); // Clear the login state if expired
      localStorage.removeItem("loginExpiry"); // Clear the expiry time
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flexBetween fixed max-container w-full padding-container z-30 backdrop-blur-md bg-black/60 rounded-xl top-0">
      <Link href="/" aria-label="Home">
        <Image
          src="/logo.png"
          alt="logo"
          className="rounded-3xl min-w-[100px]"
          width={10}
          height={59}
        />
      </Link>

      <ul
        className={`md:flex h-full ml-5 hidden gap-8 ${
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
            href="/toDoList"
            className="regular-16 text-white flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            ToDoList
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
          {isLoggedIn ? (
            <div className="flex items-center">
              <Link href="/Profile">
                <button className="flex items-center gap-2 px-5 py-2 bg-green-700 text-white rounded-2xl hover:border-white border-none">
                  <Image src="/user.svg" alt="Profile" width={20} height={20} />
                  <span className="font-bold whitespace-nowrap cursor-pointer">
                    Profile
                  </span>
                </button>
              </Link>
              <button
                onClick={logout}
                className="ml-4 flex items-center gap-2 px-5 py-2 bg-red-700 text-white rounded-2xl border border-red-600 hover:bg-red-600 hover:border-white"
              >
                <Image src="/logout.svg" alt="Logout" width={20} height={20} />
                <span className="font-bold whitespace-nowrap cursor-pointer">
                  Logout
                </span>
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="flexCenter gap-2 px-3 py-2 hover:border-red-50 bg-green-700 hover:bg-green-600 text-white rounded-2xl border btn">
                <Image src="/user.svg" alt="Login" width={20} height={14} />
                <label className="bold-10 whitespace-nowrap cursor-pointer">
                  LogIn
                </label>
              </button>
            </Link>
          )}
        </li>
      </ul>

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

      {isMenuOpen && (
        <div className="absolute top-8 text-white right-0 bg-gray-300 mt-[30px] shadow-lg rounded-lg z-50">
          <ul className="flex flex-col p-4">
            <li>
              <Link
                href="/"
                className="text-black py-2 block hover:bg-gray-700 hover:text-white hover:rounded-lg p-[20px] transition-all"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/schedules"
                className="text-black py-2 block hover:bg-gray-700  hover:text-white hover:rounded-lg p-[20px] transition-all"
                onClick={toggleMenu}
              >
                Schedules
              </Link>
            </li>
            <li>
              <Link
                href="/resources"
                className="text-black py-2 block hover:bg-gray-700 hover:text-white  hover:rounded-lg p-[20px] transition-all"
                onClick={toggleMenu}
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                href="/toDoList"
                className="text-black py-2 block hover:bg-gray-700  hover:text-white hover:rounded-lg p-[20px] transition-all"
                onClick={toggleMenu}
              >
                ToDoList
              </Link>
            </li>
            <li>
              <Link
                href="/tracker"
                className="text-black py-2 block hover:bg-gray-700 hover:text-white hover:rounded-lg p-[20px] transition-all"
                onClick={toggleMenu}
              >
                Tracker
              </Link>
            </li>
            <li className="flex flex-col justify-center">
              {isLoggedIn ? (
                <div className="flex flex-col">
                  <Link
                    href="/Profile"
                    className="text-white py-2 block hover:bg-green-600 mt-3 bg-green-700 hover:rounded-lg rounded-lg p-[20px] transition-all"
                  >
                    <div className="flex gap-2">
                      <Image
                        src="/user.svg"
                        alt="Profile"
                        width={20}
                        height={20}
                      />
                      <label className="bold-10 whitespace-nowrap cursor-pointer">
                        Profile
                      </label>
                    </div>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-white py-2 block hover:bg-red-600 bg-red-700 mt-3 rounded-lg hover:rounded-lg p-[20px] transition-all"
                  >
                    <div className="flex gap-2">
                      <Image
                        src="/logout.svg"
                        alt="Logout"
                        width={20}
                        height={20}
                      />
                      <label className="bold-10 whitespace-nowrap cursor-pointer">
                        Logout
                      </label>
                    </div>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hover:bg-green-500 bg-green-600 focus:ring-green-500 rounded-lg text-white py-2 block hover:rounded-lg p-[20px] transition-all"
                >
                  <div className="flex gap-2">
                    <Image src="/user.svg" alt="Login" width={20} height={20} />
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
