import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './CartComponent.module.css';
import Image from '../contentImages/empty.svg';
import books from '../books/books.json';
import BookBox from './elements/BookBox';

export default class CartComponent extends Component {
  state = {
    allBooks: [],
    books: [],
    booksInCart: [],
    numberOfBooks: [],
    refresh: false,
  };

  async componentDidMount() {
    await this.getAllBooks().then(this.getListCart()).then(this.getBooksCart());
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

  async getAllBooks() {
    this.setState({ allBooks: [] });
    books.forEach((item, key) => {
      this.state.allBooks[key] = item;
    });
  }

  async getBooksCart() {
    let data = [];
    this.state.allBooks.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
    console.log(this.state.booksInCart);
    this.state.allBooks.forEach((item) => {
      for (let i = 0; i < this.state.booksInCart.length; i++) {
        if (item.title === this.state.booksInCart[i].book) {
          item.quantity = this.state.booksInCart[i].number;
          data.push(item);
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

  removeBook(book, key) {
    var retVal = window.confirm('Do you want to delete this book from cart? ');
    if (retVal == true) {
      localStorage.removeItem(book.title);
      this.refreshPage(key);
      return true;
    } else {
      return false;
    }
  }

  refreshPage = (props) => {
    this.state.books.splice(props, 1);
    this.setState({ refresh: true }, () => this.setState({ refresh: false }));
  };

  render() {
    return (
      <div className={styles.Cart}>
        {this.state.books.length > 0 ? (
          <div className={styles.Books}>
            {this.state.books.map((item, key) => (
              <div className={styles.RemoveBox}>
                <CartList book={item} />
                <button
                  className={styles.RemoveButton}
                  onClick={() => this.removeBook(item, key)}
                  type='button'
                >
                  Remove {item.quantity}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <NoBooks />
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
