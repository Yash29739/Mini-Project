"use client";
import Image from "next/image";
import { useLogin } from "@/context/LoginContext";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn, logout } = useLogin();
  const menuRef = useRef<HTMLDivElement | null>(null); // Properly typed ref

  // Check login state and expiry
  useEffect(() => {
    const isLoggedIn = JSON.parse(
      localStorage.getItem("isLoggedIn") || "false"
      );
    const expiry = JSON.parse(localStorage.getItem("loginExpiry") || "0");
    const currentTime = Date.now();
    
    if (isLoggedIn && currentTime < expiry) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loginExpiry");
    }
  }, []);


  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const menuLinks = [
    { href: "/", label: "Home" },
    { href: "/schedules", label: "Suggestions" },
    { href: "/toDoList", label: "To-Do List" },
    { href: "/tracker", label: "Tracker" },
    { href: "/resources", label: "Resources" },
  ];

  return (
    <nav className="fixed w-full z-30 top-0 bg-blue-50/70 backdrop-blur-md shadow-md">
      <div className="flex items-center justify-between max-w-7xl px-6 py-4">
        {/* Leftmost Logo */}
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.png"
            alt="logo"
            className="rounded-full"
            width={100}
            height={100}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-end items-center text-black font-medium">
          {menuLinks.map((link) => (
            <li key={link.label} className="hover:bg-blue-100 rounded-xl px-5 py-2 m-1 transition duration-200">
              <Link
                href={link.href}
                className=" "
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link href="/Profile">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition">
                    <Image src="/user.svg" alt="Profile" width={20} height={20} />
                    <span>Profile</span>
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-500 transition"
                >
                  <Image src="/logout.svg" alt="Logout" width={20} height={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link href="/login">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition">
                  <Image src="/user.svg" alt="Login" width={20} height={20} />
                  <span>Log In</span>
                </button>
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="md:hidden focus:outline-none"
        >
          <Image
            src={"/menu.svg"}
            alt={"Open Menu"}
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div ref={menuRef} className=" menu absolute top-13 right-1 w-34 bg-blue-50 text-black rounded-xl shadow-lg">
          <ul className="flex flex-col gap-2 p-4">
            {menuLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block py-2 px-4 rounded-lg hover:bg-blue-100 border-2 border-blue-50 hover:border-2 hover:border-white hover:text-black transition duration-200 ease-linear"
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              {isLoggedIn ? (
                <div className="flex flex-col mt-1 gap-4">
                  <Link
                    href="/Profile"
                    className="block py-2 px-4  bg-blue-600 rounded-lg hover:bg-blue-500 transition"
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center text-center gap-2">
                      <Image
                        src="/user.svg"
                        alt="Profile"
                        width={20}
                        height={20}
                      />
                      <span className="text-white text-center">Profile</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="flex items-center gap-2 py-2 px-4 bg-red-600 rounded-lg hover:bg-red-500 transition"
                  >
                    <Image src="/logout.svg" alt="Logout" width={20} height={20} />
                    <span className="text-white text-center">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
                  onClick={toggleMenu}
                >
                  <div className="flex items-center gap-2">
                    <Image src="/user.svg" alt="Login" width={20} height={20} />
                    <span className="text-white">Log In</span>
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
