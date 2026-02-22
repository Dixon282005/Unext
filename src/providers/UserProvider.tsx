"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  isAuthenticated: boolean;
  userName: string;
  userEmail: string;
  userType: 'student' | 'company';
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  loginUser: (name: string, email: string, type: 'student' | 'company') => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userType, setUserType] = useState<'student' | 'company'>('student');
  const [isDark, setIsDark] = useState(true); // Forzamos true inicialmente porque el proyecto parece ser Dark-first

  const loginUser = (name: string, email: string, type: 'student' | 'company') => {
    setUserName(name);
    setUserEmail(email);
    setUserType(type);
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    setUserName("");
    setUserEmail("");
    setUserType('student');
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, userName, userEmail, userType, isDark, setIsDark, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
}
