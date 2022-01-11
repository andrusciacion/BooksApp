import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeComponent.module.css';
import BookBox from './elements/BookBox';
import Footer from './elements/FooterBar';
import HomeImage from '../contentImages/bookshop-logo.svg';
// import store from '../store';

export default class HomeComponent extends Component {
  state = {
    firstBooks: [],
  };

  componentDidMount() {
    this.getBooks();
  }

  async getBooks() {
    let dataArr = [];
    let url = 'http://localhost:3000/books-list';
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.forEach((item, index) => {
          if (index < 3) {
            dataArr.push(item);
          }
        });
      })
      .then(() => this.setState({ firstBooks: dataArr }));
  }

  // getBooks() {
  //   let data = [];
  //   let books = store.getState();
  //   books.forEach((item, index) => {
  //     if (index < 3) {
  //       data.push(item);
  //     }
  //   });
  //   this.setState({ firstBooks: data });
  // }

  render() {
    return (
      <div className={styles.HomeComponent}>
        <section className={styles.WelcomeSection}>
          <img className={styles.HomeImage} src={HomeImage} alt='Book' />
        </section>
        <h1>Some offers</h1>
        <section className={styles.HomeBookSection}>
          <div className={styles.BooksItems}>
            {this.state.firstBooks.map((book, key) => (
              <BookBox key={key} books={book} />
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
