import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { POST } from '../utils/apiClient'; // Adjust path if needed

const RegisterPopup = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Validation and state management
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  // Validation helpers
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 5;
  const validateUsername = (username) => username.trim().length > 0;

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setError('');

    // Validate inputs
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isUsernameValid = validateUsername(username);

    if (!isEmailValid || !isPasswordValid || !isUsernameValid) {
      setEmailError(isEmailValid ? '' : 'Please enter a valid email address.');
      setPasswordError(isPasswordValid ? '' : 'Password must be at least 5 characters long.');
      setUsernameError(isUsernameValid ? '' : 'Username is required.');
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL; // Adjust according to environment setup
      const endpoint = `${apiUrl}/api/register/`; // Registration endpoint

      const payload = {
        username,
        email,
        password,
        phone_number: phoneNumber || '', // Optional phone number
      };

      const response = await POST(endpoint,payload,
      );

      console.log('Registration successful:', response);

      // Optionally notify parent component or redirect user
      onClose(); // Close the registration popup
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
      aria-labelledby="register-popup-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          aria-label="Close Register Popup"
        >
          <FaTimes className="text-xl" />
        </button>
        <h2
          id="register-popup-title"
          className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100"
        >
          Register
        </h2>

        {error && <div className="mb-4 text-red-600 dark:text-red-400">{error}</div>}

        <form onSubmit={handleRegister} noValidate>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                formSubmitted && usernameError ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {formSubmitted && usernameError && (
              <p className="mt-1 text-sm text-red-600">{usernameError}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                formSubmitted && emailError ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {formSubmitted && emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                formSubmitted && passwordError ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {formSubmitted && passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone Number (optional)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 border-gray-300"
            />
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
              'Register'
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <span
            onClick={onLogin}
            className="text-purple-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterPopup;
