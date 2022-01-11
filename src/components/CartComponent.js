import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './CartComponent.module.css';
import Image from '../contentImages/empty.svg';
import store from '../store';
import BookBox from './elements/BookBox';
import { addBookCart } from '../actions';
import Modal from './elements/ModalView.js';

export default class CartComponent extends Component {
  state = {
    allBooks: [],
    books: [],
    booksInCart: [],
    numberOfBooks: [],
    totalPrice: 0,
    refresh: false,
    showModal: false,
    bookForRemove: {},
    typeOfMessage: '',
    redirect: false,
  };

  componentDidMount() {
    this.getBooks();
  }

  componentDidUpdate() {
    this.getBooks();
    this.updateCart();
  }

  async getBooks() {
    let url = 'http://localhost:3000/cart';
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ books: data });
      });
    this.calculateTotalPrice();
  }

  checkInput(item) {
    this.setState({
      showModal: true,
      bookForRemove: item,
      typeOfMessage: 'REMOVE_BOOK',
    });
  }

  async sendData(book) {
    let url = `http://localhost:3000/books-list/${book.id}`;
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
  }

  async updateCart(book) {
    let url = `http://localhost:3000/cart/${book.id}`;
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
  }

  async removeBook(number, book) {
    let updatedBook = {
      ...book,
      stock: book.stock + number,
      quantity: book.quantity - number,
    };

    let updatedBookCart = {
      ...book,
      stock: book.stock + number,
      quantity: book.quantity - number,
    };

    let url = `http://localhost:3000/`;
    await fetch(url + `books-list/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    })
      .then(
        await fetch(url + `cart/${book.id}`, {
          method: updatedBookCart.quantity === 0 ? 'DELETE' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedBookCart),
        })
      )
      .then(() => this.dismissModal());
  }

  checkoutCart() {
    this.setState({ showModal: true, typeOfMessage: 'CHECKOUT' });
    console.log('Checkout');
  }

  goToDelivery() {
    this.setState({ showModal: false, redirect: true });
  }

  dismissModal() {
    this.setState({ showModal: false });
  }

  updateCart() {
    store.dispatch(addBookCart({ quantity: 1 }));
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    this.state.books.forEach((book) => {
      totalPrice += book.quantity * book.price;
    });
    this.state.totalPrice = totalPrice;
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to='/delivery' />;
    }
    return (
      <div id='cart' className={styles.Cart}>
        {this.state.showModal && (
          <Modal
            typeOfMessage={this.state.typeOfMessage}
            removeBook={this.removeBook}
            bookForRemove={this.state.bookForRemove}
            dismissModal={() => this.setState({ showModal: false })}
            checkout={() => this.goToDelivery()}
          />
        )}

        {this.state.totalPrice > 0 && (
          <button className={styles.TotalButton}>
            Total: {this.state.totalPrice}$
          </button>
        )}
        {this.state.books.length > 0 ? (
          <div className={styles.Books}>
            {this.state.books.map((item, key) => (
              <div key={key} className={styles.RemoveBox}>
                <div className={styles.Information}>
                  Books:
                  <strong>{item.quantity}</strong>
                </div>
                <button
                  className={styles.RemoveButton}
                  onClick={() => this.checkInput(item)}
                  type='button'
                >
                  Remove
                </button>
                <CartList key={key} book={item} />
              </div>
            ))}
          </div>
        ) : (
          <NoBooks />
        )}
        {this.state.totalPrice > 0 && (
          <button
            className={styles.CheckoutButton}
            onClick={() => this.checkoutCart()}
          >
            Checkout
          </button>
        )}
      </div>
    );
  }
}

function CartList(props) {
  return (
    <BookBox
      books={props.book}
      style={{
        transform: 'scale(1)',
        background: 'transparent',
        width: '250px',
        boxShadow: 'none',
      }}
    />
  );
}

function NoBooks() {
  return (
    <>
      <p className={styles.NoItemsText}>There are no items...</p>
      <img className={styles.Image} src={Image} alt='' />
      <Link className={styles.Link} to='/offers'>
        Choose books...
      </Link>
    </>
  );
}
