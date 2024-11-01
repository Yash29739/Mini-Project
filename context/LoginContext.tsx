"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoginContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  login: () => void;     // Add a login function
  logout: () => void;    // Add a logout function
}

// Create a context with default values
const LoginContext = createContext<LoginContextProps>({
  isLoggedIn: false, // Default to false (user not logged in)
  setIsLoggedIn: () => {},
  login: () => {},    // Default empty function
  logout: () => {},   // Default empty function
});

// Create a provider component
export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  // Define the login function
  const login = () => setIsLoggedIn(true);
  
  // Define the logout function
  const logout = async() =>{
    try {
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
    } catch (error) {
      console.error("An error occurred:", error);
    }
  } 

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const response = await fetch("https://digital-detox-y73b.onrender.com/refresh", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include"
  //       });
        
  //       // If the cookie exists and login is valid, set logged in to true
  //       if (response.ok) {
  //         setIsLoggedIn(true);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     } catch (error) {
  //       console.error("An error occurred:", error);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use the LoginContext
export const useLogin = () => useContext(LoginContext);
