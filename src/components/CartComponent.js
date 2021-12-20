import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './CartComponent.module.css';
import Image from '../contentImages/empty.svg';
import store from '../store';
import BookBox from './elements/BookBox';
import { addBookCart } from '../actions';

export default class CartComponent extends Component {
  state = {
    allBooks: [],
    books: [],
    booksInCart: [],
    numberOfBooks: [],
    totalPrice: 0,
    refresh: false,
  };

  async componentDidMount() {
    await this.getBooks()
      .then(() => this.getListCart())
      .then(() => this.getBooksCart());
    // await this.getBooks();
  }

  allStorage() {
    var archive = [],
      keys = Object.keys(localStorage),
      i = 0,
      key;
    for (; (key = keys[i]); i++) {
      archive.push(key + '=' + localStorage.getItem(key));
    }
    return archive;
  }

  // async getAllBooks() {
  //   this.setState({ allBooks: [] });
  //   store.getState().forEach((item, key) => {
  //     this.state.allBooks[key] = item;
  //   });
  // }

  async getBooks() {
    let url = 'http://localhost:3000/books-list';
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ allBooks: data });
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

  async getBooksCart() {
    let data = [];
    this.state.allBooks.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
    this.state.allBooks.forEach((item) => {
      for (let i = 0; i < this.state.booksInCart.length; i++) {
        if (item.title === this.state.booksInCart[i].book) {
          item.quantity = this.state.booksInCart[i].number;
          data.push(item);
          this.state.totalPrice += item.price * item.quantity;
        }
      }
      this.setState({ books: data });
    });
  }

  getListCart() {
    let list = this.allStorage();
    for (let i = 0; i < list.length; i++) {
      let position = list[i].match('=');
      let book = list[i].slice(0, position.index);
      let number = list[i].slice(position.index + 1);
      this.state.booksInCart.push({ book: book, number: number });
    }
  }

  async removeBook(book, index) {
    let removedBooks = window.prompt('Number of removed books', book.quantity);
    if (removedBooks > 0 && removedBooks < book.quantity) {
      localStorage.setItem(book.title, (book.quantity -= removedBooks));
    } else if (removedBooks === book.quantity) {
      localStorage.removeItem(book.title);
    }
    console.log(book);
    await this.sendData({ ...book, stock: book.stock + Number(removedBooks) });
    this.refreshPage(index, book.quantity, removedBooks);
  }

  refreshPage = (...props) => {
    let totalPrice = 0;
    props[1] === props[2] && this.state.books.splice(props[0], 1);
    this.state.books.forEach((item) => {
      totalPrice += item.price;
    });
    this.setState({ totalPrice: totalPrice * props[1] });
    this.refreshNavBar();
  };

  refreshNavBar = () => {
    store.dispatch(addBookCart({ quantity: 1 }));
  };

  async checkoutCart() {
    for (let book of this.state.books) {
      localStorage.removeItem(book.title);
    }
    this.setState({ books: [], totalPrice: 0 });
    this.refreshNavBar();
  }

  render() {
    return (
      <div id='cart' className={styles.Cart}>
        {this.state.totalPrice > 0 && (
          <button className={styles.TotalButton}>
            Total: {this.state.totalPrice}$
          </button>
        )}
        {this.state.books.length > 0 ? (
          <div className={styles.Books}>
            {this.state.books.map((item, key) => (
              <div className={styles.RemoveBox}>
                <div className={styles.Information}>
                  Books:
                  <strong>{item.quantity}</strong>
                </div>
                <button
                  className={styles.RemoveButton}
                  onClick={() => this.removeBook(item, key)}
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
