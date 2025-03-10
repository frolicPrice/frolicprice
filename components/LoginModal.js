"use client";

import { useState } from "react";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLogin = async () => {
    setError(""); // Clear previous errors

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
      } else {
        // Store token in localStorage upon successful login
        localStorage.setItem("token", data.token); // Adjust based on API response
        alert("Login successful!"); // Redirect or do something after login
        onClose(); // Close modal on successful login
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="p-6 bg-white w-full max-w-md mx-auto overflow-hidden text-center shadow-xl rounded-2xl">
        <h2 className="text-secondary text-lg font-semibold mb-4">Login</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="dialog-input_container">
          <input
            type="text"
            placeholder="Enter your email"
            className="dialog-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="dialog-input_container mt-3">
          <input
            type="password"
            placeholder="Enter your password"
            className="dialog-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="dialog-btn w-full mt-6" onClick={handleLogin}>
          Login
        </button>

        <p className="mt-4 text-gray-500 text-sm">
  Don't have an account?{" "}
  <span 
    className="text-primary cursor-pointer" 
    onClick={() => {
      if (onSwitchToRegister) {
        onSwitchToRegister();
      } else {
        console.error("onSwitchToRegister function is not provided!");
      }
    }}
  >
    Sign Up
  </span>
</p>



        <button className="mt-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
