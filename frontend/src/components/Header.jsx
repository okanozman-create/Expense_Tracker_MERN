import React, { useState, useEffect } from 'react';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('awsToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);



  return (
    <div className='flex items-center justify-between h-20 bg-gray-800 text-white px-4'>
      <div>
        <h1 className='text-xl  lg:text-3xl tracking-wider'>Expense Tracker</h1>
      </div>
      <div className='flex'>
        {!isLoggedIn ? (
          <>
            <Register  />
            <Login  />
          </>
        ) : (
          <Logout  />
        )}
      </div>
    </div>
  );
};

export default Header;
