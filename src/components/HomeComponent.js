import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeComponent.module.css';
import books from '../books/books.json';
import BookBox from './elements/BookBox';
import Footer from './elements/FooterBar';

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
          <h1>Welcome to our book shop</h1>
        </section>
        <h1>Some offers</h1>
        <section className={styles.HomeBookSection}>
          {this.state.firstBooks.length > 2 ? (
            <div className={styles.BooksItems}>
              <BookBox books={this.state.firstBooks[0]} />
              <BookBox books={this.state.firstBooks[1]} />
              <BookBox books={this.state.firstBooks[2]} />
            </div>
          ) : null}
        </section>
        <Link className={styles.Link} to='/offers'>
          Show more...
        </Link>
        <Footer />
      </div>
    );
  }
}
