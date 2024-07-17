import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleRegister = async () => {
    try {
      const newUser = { email, password }; 
      // const response = await axios.post(
      //   "http://localhost:5000/auth/register",
      //   newUser
      // );
      const response = await axios.post(
        "https://backend-nr2q.onrender.com/auth/register",
        newUser
      );
      

      if (response.status === 201) {
        console.log("User registered successfully");
        setEmail(""); 
        setPassword(""); 
        // Optionally, you can redirect to another page or show a success message
        alert('User registered successfully! You can now log in.');
        window.location.href = "/";
      } else {
        console.error("Failed to register user:", response.statusText);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Failed to register user. Please try again."); // Display error message
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="min-h-full flex-col justify-center px-6  py-12">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-slate-700 transition-all duration-300 "
      >
        Register
      </button>

      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full h-full ${
          showModal ? "" : "hidden"
        }`}
      >
        <div className="absolute bg-white p-6 rounded-lg shadow-lg w-full sm:w-auto">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register a new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="register-email" // Use 'email' for input id
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="register-email" // Use 'email' for input id
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Use setEmail instead of setUserMail
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="register-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {error && <p className="mt-2 text-red-600">{error}</p>}

              <div>
                <button
                  onClick={handleRegister}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>
          </div>

          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
