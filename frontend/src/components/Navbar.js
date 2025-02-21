import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
  const handleLogout = () => {
    setToken('');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {token ? (
        <>
          <Link to="/tasks">Tasks</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;