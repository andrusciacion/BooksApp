import React from 'react';
import styles from './NavigationBar.module.css';

export default function NavigationBar() {
  return (
    <div>
      <nav className={styles.Navigation}>
        <h1>
          <a href='/'>iBook</a>
        </h1>
        <ul className={styles.NavigationElements}>
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
