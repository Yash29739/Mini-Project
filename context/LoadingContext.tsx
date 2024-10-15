"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Create a context with default values
const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  setIsLoading: () => {},
});

// Create a provider component
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false); // Manage loading state

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the LoadingContext
export const useLoading = () => useContext(LoadingContext);
