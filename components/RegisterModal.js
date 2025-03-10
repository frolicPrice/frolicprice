"use client";

import { useState, useEffect } from "react";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Check if the user is already registered or logged in (e.g., check localStorage or a session).
    const loggedInStatus = localStorage.getItem("userLoggedIn"); // Assuming a local storage flag
    if (loggedInStatus) {
      setIsRegistered(true);
    }
  }, []);

  if (!isOpen || isRegistered) return null;

  const handleRegister = async () => {
    setError(""); // Clear errors
    setSuccess(""); // Clear previous success messages

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed. Please try again.");
      } else {
        setSuccess("Registration successful! Please login.");
        setName("");
        setEmail("");
        setPassword("");

        // After successful registration, set a flag in localStorage to prevent re-opening the modal
        localStorage.setItem("userLoggedIn", "true");

        setTimeout(() => {
          onSwitchToLogin(); // Switch to login after successful registration
        }, 2000);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="p-6 bg-white w-full max-w-md mx-auto overflow-hidden text-center shadow-xl rounded-2xl">
        <h2 className="text-secondary text-lg font-semibold mb-4">Register</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <div className="dialog-input_container">
          <input
            type="text"
            placeholder="Enter your name"
            className="dialog-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="dialog-input_container mt-3">
          <input
            type="email"
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

        <button className="dialog-btn w-full mt-6" onClick={handleRegister}>
          Register
        </button>

        <p className="mt-4 text-gray-500 text-sm">
  Already have an account?{" "}
  <span className="text-primary cursor-pointer" onClick={onSwitchToLogin}>
    Login
  </span>
</p>


        <button className="mt-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
