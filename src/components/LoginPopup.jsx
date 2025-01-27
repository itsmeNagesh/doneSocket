import { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaGoogle, FaGithub, FaFacebookF } from "react-icons/fa"; // Icons
import ReactLoading from "react-loading"; // Loading spinner
import { callApi } from "../utils/apiClient"; // Adjust the path as needed
import { loginWithGoogle, loginWithGithub, loginWithFacebook } from "../utils/auth";

const LoginPopup = ({ onClose, onRegister, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message

  const [emailError, setEmailError] = useState(""); // Email validation error
  const [passwordError, setPasswordError] = useState(""); // Password validation error

  // Helper function to validate email format
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Helper function to validate password
  const validatePassword = (password) =>
    /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);

  // Handle form submission
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError(""); // Clear previous error
  //   setEmailError(""); // Clear email error
  //   setPasswordError(""); // Clear password error

  //   // Input validation
  //   const isEmailValid = validateEmail(email);
  //   const isPasswordValid = validatePassword(password);

  //   if (!isEmailValid || !isPasswordValid) {
  //     if (!isEmailValid) setEmailError("Please enter a valid email address.");
  //     if (!isPasswordValid)
  //       setPasswordError(
  //         "Password must be at least 8 characters, include a number, and a special character."
  //       );
  //     return; // Stop submission if validation fails
  //   }

  //   setIsLoading(true); // Start loading
  //   try {
  //     const apiUrl = import.meta.env.VITE_API_URL; // Environment variable for API base URL
  //     const endpoint = /api/login/

  //     const response = await callApi({
  //       url: endpoint,
  //       method: "POST",
  //       data: { identifier: email, password },
  //     });

  //     console.log("Login successful:", response);

  //     // Notify parent component of success
  //     if (onLoginSuccess) onLoginSuccess(response);

  //     onClose(); // Close popup
  //   } catch (err) {
  //     console.error("Login error:", err);
  //     setError(err.response?.data?.message || "Login failed. Please try again.");
  //   } finally {
  //     setIsLoading(false); // Stop loading
  //   }
  // };
  const login = async (e) => {
    e.preventDefault()
    const url = 'https://api.apexiq.ai/api/login/';
    const data = {
        identifier: 'apexiqai.solutions@gmail.com',
        password: 'Sai@#$123'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
          console.log(response)
            // throw new Error(HTTP error! status: ${response.status});
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
};



  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      aria-labelledby="login-popup-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          aria-label="Close Login Popup"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Popup Title */}
        <h2
          id="login-popup-title"
          className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100"
        >
          Login
        </h2>

        {/* Error message */}
        {error && <div className="mb-4 text-red-600 dark:text-red-400">{error}</div>}

        {/* Login Form */}
        <form  noValidate onSubmit={login}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "email-error" : undefined}
            />
            {emailError && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {emailError}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!passwordError}
              aria-describedby={passwordError ? "password-error" : undefined}
            />
            {passwordError && (
              <p id="password-error" className="mt-1 text-sm text-red-600">
                {passwordError}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition-colors flex items-center justify-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <ReactLoading type="spin" color="#ffffff" height={24} width={24} />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-6 flex flex-col items-center">
          <hr className="w-full border-t border-gray-300" />
          <p className="my-4 text-gray-600">or continue with</p>
          <div className="flex justify-center space-x-4">
            <button onClick={loginWithGoogle} className="text-red-500 text-3xl">
              <FaGoogle />
            </button>
            <button onClick={loginWithGithub} className="text-gray-700 text-3xl">
              <FaGithub />
            </button>
            <button onClick={loginWithFacebook} className="text-blue-600 text-3xl">
              <FaFacebookF />
            </button>
          </div>
        </div>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={onRegister}
            className="text-purple-600 cursor-pointer hover:underline"
          >
            Register now
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPopup;