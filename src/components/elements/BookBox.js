import React from 'react';
import styles from './BookBox.module.css';

export default function BookBoxElement(props) {
  const imageLink = `${props.books.imageLink}`;
  return (
    <div className={styles.BookBox}>
      <img src={imageLink} alt='img' />
      <h2>{props.books.title}</h2>
      <h3>{props.books.author}</h3>
      <p>
        <strong>{props.books.price} $</strong>{' '}
      </p>
    </div>
  );
}
