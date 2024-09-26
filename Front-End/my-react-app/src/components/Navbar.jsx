import React from 'react';
import { Link } from 'react-router-dom';
import "../Styles/navbar.css";


const Navbar = () => {
  return (
    <div className='navBar'>
    <nav>
      <ul>
        <li>
          <Link className="paraPagina" to="/">Home</Link>
        </li>
      </ul>
      <div className="titulo">
      <h1 className="titulo">PsyInfo</h1>
      </div>
    </nav>
    </div>
  );
}

export default Navbar;