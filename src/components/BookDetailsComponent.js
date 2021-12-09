import React, { Component, useEffect } from 'react';
import styles from './BookDetails.module.css';
import { useLocation } from 'react-router-dom';

export default class BookDetailsComponent extends Component {
  state = {
    book: [],
    numberOfBooks: 0,
  };

  receiveBook = (value) => {
    this.setState({ book: value });
  };

  addToCart = () => {
    console.log(this.state.book.title);
    let storedItem = localStorage.getItem(`${this.state.book.title}`);
    console.log(storedItem);
    if (storedItem !== null) {
      let quantity = Number(storedItem);
      localStorage.setItem(this.state.book.title, (quantity += 1));
    } else {
      localStorage.setItem(this.state.book.title, 1);
    }
  };

  render() {
    const book = this.state.book;
    return (
      <div className={styles.Parent}>
        <GetDetails useCallback={this.receiveBook} />
        <div className={styles.BookDetails}>
          <section className={styles.BookPresentation}>
            <div className={styles.BookTitle}>{book.title}</div>
            <img className={styles.BookImage} src={book.imageLink} alt='img' />
          </section>
          <div>
            <section className={styles.BookInformation}>
              by
              <div className={styles.BookAuthor}>{book.author}</div>
              <div className={styles.BookYear}>
                <strong>Year: </strong>
                {book.year}
              </div>
              <div className={styles.BookCountry}>
                <strong>Country: </strong> {book.country}
              </div>
              <div className={styles.BookCountry}>
                {' '}
                <strong>Pages: </strong>
                {book.pages}
              </div>
            </section>
            <section className={styles.BuyBookSection}>
              <div className={styles.BuyBook}>
                <button
                  className={styles.Button}
                  onClick={() => this.addToCart()}
                >
                  Add to Cart
                </button>
                <div className={styles.Price}>
                  <strong>Price: </strong> {book.price + ' $'}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

function GetDetails(props) {
  const location = useLocation();
  const { book } = location.state;
  useEffect(() => {
    props.useCallback(book);
  }, []);
  return null;
}
