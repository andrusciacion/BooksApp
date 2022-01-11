import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styles from './BookBox.module.css';
import store from '../../store';
import { addBookCart } from '../../actions';

export default function BookBoxElement(props) {
  const imageLink = `${props.books.imageLink}`;
  const [favouriteBook, setFavourite] = useState(props.books.favourite);

  const setFavouriteBook = () => {
    sendData().then(setFavourite((prevFavourite) => !prevFavourite));
  };

  async function sendData() {
    let url = `http://localhost:3000/books-list/${props.books.id}`;
    {
      console.log(favouriteBook);
    }
    let newArr = { ...props.books, favourite: !favouriteBook };
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArr),
    }).then(() => addToStoreCart());
  }

  function addToStoreCart() {
    store.dispatch(addBookCart({ quantity: 1 }));
  }

  return (
    <div className={styles.BookBox} style={props.style}>
      <Link
        // key={key}
        className={styles.Link}
        to={{ pathname: '/details' }}
        // state={{ book: item, key: key }}
        state={{ book: props.books }}
      >
        <img src={imageLink} alt='img' />
        <h2 className={styles.Title}>{props.books.title}</h2>
        <p>{props.books.author}</p>
      </Link>
      <div className={styles.BottomInformation}>
        <p>
          <strong>{props.books.price} $</strong>
        </p>
        {favouriteBook ? (
          <AiFillHeart
            style={{
              fontSize: 30,
              flex: 0.5,
              marginBlock: 'auto',
              zIndex: 1,
              color: 'red',
              cursor: 'pointer',
            }}
            onClick={() => setFavouriteBook()}
          />
        ) : (
          <AiOutlineHeart
            style={{
              fontSize: 30,
              flex: 0.5,
              marginBlock: 'auto',
              zIndex: 1,
              cursor: 'pointer',
            }}
            onClick={() => setFavouriteBook()}
          />
        )}
      </div>
    </div>
  );
}
