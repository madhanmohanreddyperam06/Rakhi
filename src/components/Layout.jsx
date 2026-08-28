import React from 'react';
import './Layout.css';

const Layout = ({ children, className = '' }) => (
  <div className={`layout ${className}`}>
    <div className="layout-content">{children}</div>
  </div>
);

export default Layout;
