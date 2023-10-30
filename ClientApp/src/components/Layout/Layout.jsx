import React from 'react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="page">
      <div className="menu">
        <NavLink className="link" to="/">Posts</NavLink>
        <NavLink className="link" to="/about">About</NavLink>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Layout;