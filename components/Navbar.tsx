"use client";
import Image from "next/image";
import { useLogin } from "@/context/LoginContext";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn, logout } = useLogin();

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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const menuLinks = [
    { href: "/", label: "Home" },
    { href: "/schedules", label: "Schedules" },
    { href: "/resources", label: "Resources" },
    { href: "/toDoList", label: "To-Do List" },
    { href: "/tracker", label: "Tracker" },
  ];

  return (
    <nav className="fixed w-full z-30 top-0 bg-blue-800/70 backdrop-blur-md shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        {/* Leftmost Logo */}
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.png"
            alt="logo"
            className="rounded-full"
            width={60}
            height={60}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-white font-medium">
          {menuLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="hover:text-blue-300 transition duration-200"
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
            src="/menu.svg"
            alt="Menu"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-6 w-64 bg-blue-900 text-white rounded-xl shadow-lg">
          <ul className="flex flex-col gap-4 p-4">
            {menuLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/Profile"
                    className="block py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src="/user.svg"
                        alt="Profile"
                        width={20}
                        height={20}
                      />
                      <span>Profile</span>
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
                    <span>Logout</span>
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
                    <span>Log In</span>
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
