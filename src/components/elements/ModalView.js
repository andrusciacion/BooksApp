import React, { useEffect, useState } from 'react';
import styles from './ModalView.module.css';

export default function ModalView(props) {
  const MESSAGES = {
    ADD_TO_CART: 'Book(s) added to cart!',
    CHECKOUT: 'Thank you for your purchase!',
    DELETE: 'Delete books(s)?',
    SAVE_BOOK: 'Save changes?',
    REMOVE_BOOK: 'Remove book(s)?',
  };

  const [message, setMessage] = useState('');
  const [numberOfBooks, setNumberOfBooks] = useState(1);

  useEffect(() => {
    console.log(props.bookForRemove);
    switch (props.typeOfMessage) {
      case 'ADD_TO_CART':
        setMessage(MESSAGES.ADD_TO_CART);
        break;
      case 'CHECKOUT':
        setMessage(MESSAGES.CHECKOUT);
        break;
      case 'DELETE':
        setMessage(MESSAGES.DELETE);
        break;
      case 'SAVE_CHANGES':
        setMessage(MESSAGES.SAVE_BOOK);
        break;
      case 'REMOVE_BOOK':
        setMessage(MESSAGES.REMOVE_BOOK);
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className={styles.ModalParent}>
      <div className={styles.Modal}>
        <h1>iBook</h1>
        <p>{message}</p>
        {props.typeOfMessage === 'ADD_TO_CART' && (
          <button
            className={styles.Button}
            onClick={() => props.dismissModal()}
          >
            OK
          </button>
        )}
        {props.typeOfMessage === 'CHECKOUT' && (
          <button className={styles.Button} onClick={() => props.checkout()}>
            Continue
          </button>
        )}
        {props.typeOfMessage === 'DELETE' && (
          <div className={styles.DeleteButtons}>
            <button
              className={styles.Button}
              onClick={() => {
                props.deleteBook();
              }}
            >
              Yes
            </button>
            <button
              className={styles.Button}
              onClick={() => props.dismissModal()}
            >
              Cancel
            </button>
          </div>
        )}
        {props.typeOfMessage === 'SAVE_CHANGES' && (
          <div className={styles.DeleteButtons}>
            <button
              className={styles.Button}
              onClick={() => {
                props.saveBook();
              }}
            >
              Yes
            </button>
            <button
              className={styles.Button}
              onClick={() => props.dismissModal()}
            >
              Cancel
            </button>
          </div>
        )}
        {props.typeOfMessage === 'REMOVE_BOOK' && (
          <div style={{ width: '100%' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: -15,
              }}
            >
              <label htmlFor='booksNumber' style={{ marginInline: 'auto' }}>
                Number of removed books:
              </label>
              <input
                type='number'
                name='booksNumber'
                style={{
                  borderRadius: 10,
                  border: 'none',
                  fontSize: 18,
                  padding: 5,
                  marginBottom: -10,
                  outline: 'none',
                  width: '50%',
                  marginInline: 'auto',
                }}
                min={1}
                max={props.bookForRemove.quantity}
                value={numberOfBooks}
                onChange={(input) =>
                  Number(input.target.value) > props.bookForRemove.quantity ||
                  Number(input.target.value) < 1
                    ? 1
                    : setNumberOfBooks(Number(input.target.value))
                }
              />
            </div>

            <div className={styles.DeleteButtons}>
              <button
                className={styles.Button}
                onClick={() => {
                  props.removeBook(numberOfBooks, props.bookForRemove);
                }}
              >
                Yes
              </button>
              <button
                className={styles.Button}
                onClick={() => props.dismissModal()}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
