import React from 'react';
import SearchBar from './SearchBar';
import '../styles/navbar.css'


function Navbar() {
  return (
  
      <nav className="nav_container">
      
          <span className="navbar">
            <div className='a_div'>
              <a href="/home" className='a_navbar'>HENRY DOGS</a>

            </div>
          </span>
          
          <div className='searchbar'>
              <SearchBar/>   

          </div>  
      </nav>

 

  );
};

export default Navbar;