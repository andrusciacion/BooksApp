import React, { Component, useEffect } from 'react';
import styles from './BookDetails.module.css';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { addBookCart } from '../actions';
import Modal from './elements/ModalView';
import store from '../store';

const ADD_TO_CART = 'ADD_TO_CART';
const DELETE = 'DELETE';
const URL = 'http://localhost:3000/';

export default class BookDetailsComponent extends Component {
  state = {
    book: [],
    numberOfBooks: 1,
    added: false,
    redirect: false,
    showModal: false,
    typeOfMessage: '',
    bookInCart: false,
  };

  componentDidUpdate() {
    console.log(this.state.book);
  }

  receiveBook = (value) => {
    this.setState({ book: value });
  };

  async addToCart(method) {
    let numberOfBooks = this.state.numberOfBooks;
    let url = `${URL}cart${method === 'PUT' ? '/' + this.state.book.id : ''}`;

    this.setState({
      book: {
        ...this.state.book,
        stock: this.state.book.stock - numberOfBooks,
        quantity: this.state.book.quantity + Number(numberOfBooks),
      },
    });

    await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.book),
    });

    this.sendData();
    this.addToStoreCart();
  }

  addToStoreCart = () => {
    store.dispatch(addBookCart({ quantity: 1 }));
  };

  async deleteBook() {
    let url = `${URL}books-list/${this.state.book.id}`;
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => this.setState({ redirect: true }));
  }

  async sendData() {
    let url = `${URL}books-list/${this.state.book.id}`;
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.book),
    });
  }

  async checkCart() {
    let url = `${URL}cart`;
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === this.state.book.id) return this.addToCart('PUT');
        }
        return this.addToCart('POST');
      });
  }

  async handleActions(button) {
    switch (button.target.name) {
      case ADD_TO_CART:
        this.checkCart();
        this.setState({ showModal: true, typeOfMessage: ADD_TO_CART });
        break;
      case DELETE:
        this.setState({ showModal: true, typeOfMessage: DELETE });
        break;
      default:
        break;
    }
  }

  render() {
    const book = this.state.book;
    if (this.state.redirect) {
      return <Navigate to='/offers' />;
    }
    return (
      <div className={styles.Parent}>
        <GetDetails useCallback={this.receiveBook} />
        {this.state.showModal && (
          <Modal
            typeOfMessage={this.state.typeOfMessage}
            dismissModal={() => {
              this.setState({ showModal: false });
            }}
            deleteBook={() => this.deleteBook()}
          />
        )}
        <button
          className={styles.EditButton}
          name={DELETE}
          style={{
            left: 10,
            top: 90,
            width: '11%',
            backgroundColor: '#cc0000',
          }}
          onClick={(button) => this.handleActions(button)}
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
                    name={ADD_TO_CART}
                    className={styles.Button}
                    onClick={(button) => this.handleActions(button)}
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
                        numberOfBooks:
                          Number(input.target.value) > this.state.book.stock ||
                          Number(input.target.value) < 1
                            ? 1
                            : Number(input.target.value),
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
