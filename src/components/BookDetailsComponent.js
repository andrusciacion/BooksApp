import React, { Component, useEffect } from 'react';
import styles from './BookDetails.module.css';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { addBookCart } from '../actions';
import store from '../store';

export default class BookDetailsComponent extends Component {
  state = {
    book: [],
    numberOfBooks: 1,
    added: false,
    redirect: false,
  };

  componentDidUpdate() {
    this.sendData(this.state.book.id);
  }

  receiveBook = (value) => {
    this.setState({ book: value });
  };

  addToCart = () => {
    let storedItem = localStorage.getItem(`${this.state.book.title}`);
    let numberOfBooks = this.state.numberOfBooks;
    if (storedItem !== null) {
      let quantity = Number(storedItem);
      localStorage.setItem(this.state.book.title, (quantity += numberOfBooks));
    } else {
      localStorage.setItem(this.state.book.title, numberOfBooks);
    }
    this.setState({
      book: {
        ...this.state.book,
        stock: this.state.book.stock - numberOfBooks,
      },
    });
    alert('Book added!');
    this.addToStoreCart();
  };

  addToStoreCart = () => {
    store.dispatch(addBookCart({ quantity: 1 }));
  };

  async deleteBook() {
    let approved = window.confirm('Delete book? ');
    if (approved) {
      let url = `http://localhost:3000/books-list/${this.state.book.id}`;
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => this.setState({ redirect: true }));
    }
  }

  async sendData(id) {
    console.log(this.state.book);
    let url = `http://localhost:3000/books-list/${id}`;
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.book),
    });
  }

  render() {
    const book = this.state.book;
    if (this.state.redirect) {
      return <Navigate to='/offers' />;
    }
    return (
      <div className={styles.Parent}>
        <GetDetails useCallback={this.receiveBook} />
        <button
          className={styles.EditButton}
          style={{
            left: 10,
            top: 90,
            width: '15%',
            backgroundColor: '#cc0000',
          }}
          onClick={() => this.deleteBook()}
        >
          Delete
        </button>
        <Link
          to={{ pathname: '/edit' }}
          className={styles.EditButton}
          state={{ book: this.state.book }}
        >
          Edit
        </Link>
        <div className={styles.BookSection}>
          <div className={styles.BookDetails}>
            <div className={styles.BookPresentation}>
              {this.state.book.stock === 0 && (
                <p className={styles.StockOut}>Out of stock</p>
              )}
              <img
                className={styles.BookImage}
                src={book.imageLink}
                alt='img'
              />
            </div>
            <div className={styles.BookInformation}>
              <section>
                <div className={styles.BookTitle}>{book.title}</div>
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
                <div
                  className={styles.BookCountry}
                  style={{ marginTop: 30, fontSize: 20 }}
                >
                  <strong>Stock: </strong>
                  {book.stock}
                </div>
              </section>
              <section className={styles.BuyBookSection}>
                <div className={styles.BuyBook}>
                  <button
                    className={styles.Button}
                    onClick={() => this.addToCart()}
                    style={
                      this.state.book.stock === 0
                        ? { color: 'red', cursor: 'default' }
                        : { color: 'white' }
                    }
                    disabled={this.state.book.stock === 0 ? true : false}
                  >
                    Add to Cart
                  </button>
                  <label
                    htmlFor='books-number'
                    className={styles.NumberBooksLabel}
                  >
                    Number of books:
                  </label>
                  <input
                    min={1}
                    max={this.state.book.stock}
                    name='books-number'
                    type='number'
                    placeholder='Number of books'
                    className={styles.BooksInput}
                    value={
                      this.state.book.stock === 0 ? 0 : this.state.numberOfBooks
                    }
                    onChange={(input) =>
                      this.setState({
                        numberOfBooks: Number(input.target.value),
                      })
                    }
                    disabled={this.state.book.stock === 0 ? true : false}
                  />
                  <div className={styles.Price}>
                    <strong>Price: </strong> {book.price + ' $'}
                  </div>
                </div>
              </section>
            </div>
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
