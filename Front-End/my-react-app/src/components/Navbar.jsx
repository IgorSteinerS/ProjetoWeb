import React from 'react';
import { Link } from 'react-router-dom';
import "../Styles/navbar.css";


const Navbar = () => {
  return (
    <div className='navBar'>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
}

export default Navbar;