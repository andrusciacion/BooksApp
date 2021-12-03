import React from 'react';
import './NavigationStyle.css';

export default function NavigationComponent() {
  return (
    <div>
      <nav className='nav'>
        <h1>
          <a href='/'>iBook</a>
        </h1>
        <ul className='nav-elements'>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/offers'>Offers</a>
          </li>
          <li>
            <a href='/contact'>Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
