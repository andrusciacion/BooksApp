import React from 'react';
import styles from './BookBox.module.css';

export default function BookBoxElement(props) {
  const imageLink = `${props.books.imageLink}`;
  const price = Math.floor(Math.random() * 80) + 30;
  return (
    <div className={styles.BookBox} style={props.style}>
      <img src={imageLink} alt='img' />
      <h2>{props.books.title}</h2>
      <h3>{props.books.author}</h3>
      <p>
        <strong>{price} $</strong>
      </p>
    </div>
  );
}
