import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeComponent.module.css';
import books from '../books/books.json';
import BookBox from './elements/BookBox';
import Footer from './elements/FooterBar';
import HomeImage from '../contentImages/bookshop-logo.svg';

export default class HomeComponent extends Component {
  state = {
    firstBooks: [{ image: '', title: '', author: '' }],
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    let data = [];
    books.forEach((item, index) => {
      if (index < 3) {
        data.push(item);
      }
    });
    this.setState({ firstBooks: data });
  }

  render() {
    return (
      <div className={styles.HomeComponent}>
        <section className={styles.WelcomeSection}>
          <img className={styles.HomeImage} src={HomeImage} alt='Book' />
          {/* <h1>Welcome to our book shop</h1> */}
        </section>
        <h1>Some offers</h1>
        <section className={styles.HomeBookSection}>
          <div className={styles.BooksItems}>
            {this.state.firstBooks.map((book, key) => (
              <Link
                to='/details'
                state={{ book: book }}
                key={key}
                style={{ color: 'black', textDecoration: 'none' }}
              >
                <BookBox books={book} />
              </Link>
            ))}
          </div>
        </section>
        <Link className={styles.Link} to='/offers'>
          Show more...
        </Link>
        <Footer />
      </div>
    );
  }
}
