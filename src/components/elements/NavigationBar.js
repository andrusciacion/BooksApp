import React, { useState, useEffect } from 'react';
import styles from './NavigationBar.module.css';
import { ImCart } from 'react-icons/im';

export default function NavigationBar(props) {
  return (
    <div>
      <nav id='navigation-bar' className={styles.Navigation}>
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
          <li>
            <a href='/cart' id='cart' className={styles.NavigationLogo}>
              <ImCart />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
