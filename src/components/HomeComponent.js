import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomeComponent.css';
import books from '../books/books.json';
import BookBox from './elements/BookBoxElement';
import Footer from './elements/FooterElement';

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
      <div className='home-component'>
        <section className='welcome-section'>
          <h1>Welcome to our book shop</h1>
        </section>
        <h1>Some offers</h1>
        <section className='home-book-section'>
          {this.state.firstBooks.length > 2 ? (
            <div className='books-items'>
              <BookBox books={this.state.firstBooks[0]} />
              <BookBox books={this.state.firstBooks[1]} />
              <BookBox books={this.state.firstBooks[2]} />
            </div>
          ) : null}
        </section>
        <Link className='link' to='/offers'>
          Show more...
        </Link>
        <section className='footer'>
          <Footer />
        </section>
      </div>
    );
  }
}
