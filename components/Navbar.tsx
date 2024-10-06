"use client";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if(isMenuOpen){
    }
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/" aria-label="Home">
        <Image src="/logo.png" alt="logo" width={194} height={59} />
      </Link>

      <ul className={`lg:flex h-full hidden gap-12 ${isMenuOpen ? "flex" : "hidden"} lg:items-center`}>
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link href={link.href} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold" aria-label={link.label}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        <Button 
          type="button"
          title="Login"
          icon="/user.svg"
          dest="/login"
          variant="btn_dark_green"
        />
      </div>

      {/* Mobile Menu Button */}
      <button onClick={toggleMenu} aria-label="Toggle Menu" className="lg:hidden">
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
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className="text-white py-2 block hover:bg-gray-700 hover:rounded-lg p-[20px]  transition-all" onClick={toggleMenu}>
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
