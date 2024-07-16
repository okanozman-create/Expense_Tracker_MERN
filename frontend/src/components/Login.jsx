import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [usermail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {


      // const response = await axios.post("http://localhost:5000/auth/login", {
      //   email: usermail,
      //   password,
      // });

      const response = await axios.post(
        "https://juz13lwu78.execute-api.eu-west-1.amazonaws.com/DEV/myExpenseFunction/auth/login",
        {
          email: usermail,
          password,
        }
      );


      console.log("Logged in successfully:", response.data);

      // Store the JWT token securely (example using localStorage)
      localStorage.setItem("awsToken", response.data.token);

      const userEmail = response.data.email;
      alert(`Welcome ${userEmail}! 👍👍👍`);
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to log in. Please try again.");
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setUserMail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="min-h-full flex-col justify-center px-6 py-12">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-slate-700 transition-all duration-300"
      >
        <span className="text-center">Login</span>
      </button>

      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full h-full ${
          showModal ? "" : "hidden"
        }`}
      >
        <div className="absolute bg-white p-6 rounded-lg shadow-lg w-full sm:w-auto">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
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
                  htmlFor="login-usermail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="login-usermail"
                    name="usermail"
                    type="email"
                    autoComplete="usermail"
                    required
                    value={usermail}
                    onChange={(e) => setUserMail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
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
                  onClick={handleLogin}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
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

export default Login;
