// src/components/LoginPopup.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaGoogle, FaGithub, FaFacebookF } from 'react-icons/fa'; // Importing icons
import Cookies from 'js-cookie';
import { POST} from '../utils/apiClient'; // Adjust the path as needed
import ReactLoading from 'react-loading'; // Import react-loading
const LoginPopup = ({ onClose, onRegister, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Additional states for handling loading and error messages
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Validation states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // State to track if the form has been submitted
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Helper function to validate email format
  const validateEmail = (email) => {
    // Simple regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Helper function to validate password
  const validatePassword = (password) => {
    return password.length >= 5; // Example: minimum 6 characters
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setFormSubmitted(true); // Mark the form as submitted
    setError('');

    // Validate inputs
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      // Set appropriate error messages
      if (!isEmailValid) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }

      if (!isPasswordValid) {
        setPasswordError('Password must be at least 5 characters long.');
      } else {
        setPasswordError('');
      }

      return; 
    }

    // If validation passes, proceed with API call
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL; // Accessing Vite environment variable
      const endpoint = `${apiUrl}/api/login/`;
      POST
      const response = await POST(endpoint,{ identifier:email, password },
      );
      console.log('Login successful:', response);

      if (onLoginSuccess) {
        onLoginSuccess(response); // Pass any relevant data
      }

      // Close the popup
      onClose();
    } catch (err) {
      // Handle errors (e.g., invalid credentials)
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          aria-label="Close Login Popup"
        >
          <FaTimes className="text-xl" />
        </button>
        <h2
          id="login-popup-title"
          className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100"
        >
          Login
        </h2>

        {error && (
          <div className="mb-4 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} noValidate>
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
                formSubmitted && emailError ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              aria-invalid={formSubmitted && emailError ? 'true' : 'false'}
              aria-describedby={formSubmitted && emailError ? 'email-error' : undefined}
            />
            {formSubmitted && emailError && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {emailError}
              </p>
            )}
          </div>

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
                formSubmitted && passwordError ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              aria-invalid={formSubmitted && passwordError ? 'true' : 'false'}
              aria-describedby={formSubmitted && passwordError ? 'password-error' : undefined}
            />
            {formSubmitted && passwordError && (
              <p id="password-error" className="mt-1 text-sm text-red-600">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition-colors flex items-center justify-center ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <ReactLoading type="spin" color="#ffffff" height={24} width={24} />
            ) : (

              'Submit'
            )}
          </button>
        </form>
        <div>
        <div className="mt-6 flex flex-col items-center">
          <hr className="w-full border-t border-gray-300" />
          <p className="my-4 text-gray-600">or continue with</p>
          <div className="flex justify-center space-x-4">
            <button  className="text-red-500 text-3xl">
              <FaGoogle />
            </button>
            <button  className="text-gray-700  text-3xl">
              <FaGithub />
            </button>
          </div>
        </div>
    
    </div>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
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
