"use client";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu
  const [loggedIn, setloggedIn] = useState(false);

  // Handle login functionality
  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Entered the Log-In function");

    try {
      const response = await fetch(
        "https://digital-detox-y73b.onrender.com/refresh",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Profile exists");
        setloggedIn(result.loggedIn); // Set login state to true
      } else {
        console.error("Login error:", result.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Handle menu toggle for mobile view
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/" aria-label="Home">
        <Image src="/logo.png" alt="logo" width={194} height={59} />
      </Link>

      <ul
        className={`md:flex h-full hidden gap-8 ${
          isMenuOpen ? "flex" : "hidden"
        } md:items-center`}
      >
        <li>
          <Link
            href="/"
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/schedules"
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            Schedules
          </Link>
        </li>
        <li>
          <Link
            href="/resources"
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            Resources
          </Link>
        </li>
        <li>
          <Link
            href="/tracker"
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            Tracker
          </Link>
        </li>
      </ul>

      {/* Render Login/Profile Button */}
      <div className="md:flex hidden md:items-center">
        {!loggedIn ? (
          // Render login button when not logged in
          <button
            className="flexCenter gap-2 px-3 py-2 border-yellow-400 hover:border-red-50 hover:bg-slate-900 bg-slate-950 text-white rounded-2xl border btn"
            onClick={handleLogIn} // Trigger login logic
          >
            <Image src="/user.svg" alt="Login" width={20} height={14} />
            <label className="bold-10 whitespace-nowrap cursor-pointer">
              LogIn
            </label>
          </button>
        ) : (
          // Render profile icon when logged in
          <Link href="/profile">
            <button
              className="flexCenter gap-2 px-3 py-2 border-yellow-400 hover:border-red-50 hover:bg-slate-900 bg-slate-950 text-white rounded-2xl border btn"
              type="button"
            >
              <Image src="/user.svg" alt="Profile" width={20} height={20} />
              <label className="bold-10 whitespace-nowrap cursor-pointer">
                Profile
              </label>
            </button>
          </Link>
        )}
      </div>

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
          <ul className="flex flex-col p-4">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="text-white py-2 block hover:bg-gray-700 hover:rounded-lg p-[20px]  transition-all"
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
