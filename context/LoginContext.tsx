"use client"
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';


interface LoginContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  login: () => void;     // Add a login function
  logout: () => void;    // Add a logout function
}

// Create a context with default values
const LoginContext = createContext<LoginContextProps>({
  isLoggedIn: false, // Default to false (user not logged in)
  setIsLoggedIn: () => { },
  login: () => { },    // Default empty function
  logout: () => { },   // Default empty function
});


// Create a provider component
export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
  const router = useRouter()
  const refreshToken = async () => {
    try {
      const response = await fetch("https://digital-detox-y73b.onrender.com/refresh", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setIsLoggedIn(true)
        // Store login state in local storage with an expiry time
        const expiryTime = Date.now() + 23 * 60 * 60 * 1000; // 1 day in milliseconds
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('loginExpiry', JSON.stringify(expiryTime));
      } else {
        toast.error(result.message);
        router.push('/')
      }
    } catch (error) {
      toast.error("An error occurred: " + error);
    }
  }

  useEffect(() => {
    const storedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
    const expiryTime = JSON.parse(localStorage.getItem('loginExpiry') || '0');
    const currentTime = Date.now();

    if (storedIsLoggedIn && currentTime < expiryTime) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('loginExpiry');
      refreshToken();
    }
  }, []);

  // Define the login function
  const login = () => setIsLoggedIn(true);

  // Define the logout function
  const logout = async () => {
    console.log("Entered the logout function")
    try {
      console.log("Entered the try function")
      await fetch(
        "https://digital-detox-y73b.onrender.com/logout",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        }
      );
      setIsLoggedIn(false)
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('loginExpiry');
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }


  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use the LoginContext
export const useLogin = () => useContext(LoginContext);
function setIsLoggedIn(arg0: boolean) {
  throw new Error('Function not implemented.');
}

