"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically importing modals
const LoginModal = dynamic(() => import("../components/LoginModal"), { ssr: false });
const RegisterModal = dynamic(() => import("../components/RegisterModal"), { ssr: false });

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load theme and authentication status on mount
  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("token");
    const theme = localStorage.getItem("theme");

    if (!token) {
      setIsLoginModalOpen(true);
    } else {
      setIsLoggedIn(true);
    }

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");

    // Ensure immediate UI update
    document.documentElement.classList.remove("dark", "light"); 
    document.documentElement.classList.add(newMode ? "dark" : "light");
  };

  const switchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  if (!isMounted) return null;

  return (
    <header className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <nav className="flex justify-between items-center p-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-1">
          <Image src="/assets/icons/logo.svg" width={27} height={27} alt="logo" />
          <p className="nav-logo">Frolic<span className="text-primary">Wise</span></p>
        </Link>

        {/* Icons Section */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="focus:outline-none text-xl">
            {isDarkMode ? "🌙" : "☀️"}
          </button>

          <Image src="/assets/icons/search.svg" alt="search" width={28} height={28} />
          <Image src="/assets/icons/black-heart.svg" alt="heart" width={28} height={28} />
          <Image
            src="/assets/icons/user.svg"
            alt="user"
            width={28}
            height={28}
            className="cursor-pointer"
            onClick={() => setIsLoginModalOpen(true)}
          />
        </div>
      </nav>

      {/* Login & Register Modals */}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSwitchToRegister={switchToRegister}
        />
      )}
      {isRegisterModalOpen && (
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onSwitchToLogin={switchToLogin}
        />
      )}
    </header>
  );
};

export default Navbar;
