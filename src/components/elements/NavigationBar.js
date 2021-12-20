import React, { useEffect, useState } from 'react';
import styles from './NavigationBar.module.css';
import { ImCart } from 'react-icons/im';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NavigationBar(props) {
  const [numberOfBooks, setnumberOfBooks] = useState(0);
  const [numberOfFavourites, setnumberOfFavourites] = useState(0);

  useSelector((state) => state);

  useEffect(() => {
    let count = 0;
    let keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      count += Number(localStorage.getItem(keys[i]));
    }
    setnumberOfBooks(count);
    getFavourites();
  });

  async function getFavourites() {
    let url = 'http://localhost:3000/books-list';
    let count = 0;
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].favourite) {
            count++;
          }
        }
        setnumberOfFavourites(count);
      });
  }

  return (
    <div>
      <nav id='navigation-bar' className={styles.Navigation}>
        <h1>
          <Link to={'/'}>iBook</Link>
        </h1>
        <ul className={styles.NavigationElements}>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/offers'}>Offers</Link>
            <ul className={styles.DropdownContent}>
              <li>
                <Link to={'/add-book'}>Add Book</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={'/contact'}>Contact</Link>
          </li>
          <li>
            <Link to={'/favourites'} className={styles.NavigationLogo}>
              <AiFillHeart />
              {numberOfFavourites > 0 && (
                <div className={styles.Badge}>
                  <div className={styles.BadgeCircle}>{numberOfFavourites}</div>
                </div>
              )}
            </Link>
          </li>
          <li>
            <Link to={'/cart'} className={styles.NavigationLogo}>
              <ImCart />
              {numberOfBooks > 0 && (
                <div className={styles.Badge}>
                  <div className={styles.BadgeCircle}>{numberOfBooks}</div>
                </div>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
