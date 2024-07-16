import React from "react";

const Logout = () => {
  const handleLogout = () => {
    // Check if the user is logged in
    const token = localStorage.getItem("awsToken");
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    // Remove the JWT token
    localStorage.removeItem("awsToken");

    // Optionally, notify the server about logout (not needed for JWT in local storage)
    //  axios.post('http://localhost:5000/auth/logout').then(response => console.log(response.data));

    alert("You have been logged out.");
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className=" bg-[#3b82f6] text-white px-4 py-2 rounded  hover:bg-slate-700 transition-all duration-300 "
    >
      Logout
    </button>
  );
};

export default Logout;
