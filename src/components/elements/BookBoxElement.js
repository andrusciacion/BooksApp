import React from 'react';
import './BookBox.css';

export default function BookBoxElement(props) {
  const imageLink = `${props.books.imageLink}`;
  return (
    <div className='book-box'>
      <img src={imageLink} alt='img' />
      <h2>{props.books.title}</h2>
      <h3>{props.books.author}</h3>
      <p>
        <strong>{props.books.price} $</strong>{' '}
      </p>
    </div>
  );
}
