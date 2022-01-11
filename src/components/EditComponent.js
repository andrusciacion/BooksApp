import React, { Component, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './EditComponent.module.css';
import Modal from './elements/ModalView.js';
// import store from '../store';
// import { editBook } from '../actions';

export default class EditComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      changedBook: {},
      updated: false,
      showModal: false,
    };
    this.reference = null;
    this.setBook = this.setBook.bind(this);
  }

  setBook = (book) => {
    // this.state.book = book;
    this.setState({ book: book });
    // this.state.changedBook = book;
    this.setState({ updated: true });
  };

  saveBookDetails = (value) => {
    switch (value.target.name) {
      case 'title':
        this.setState({
          changedBook: { ...this.state.changedBook, title: value.target.value },
        });

        break;
      case 'author':
        this.setState({
          changedBook: {
            ...this.state.changedBook,
            author: value.target.value,
          },
        });

        break;
      case 'year':
        this.setState({
          changedBook: {
            ...this.state.changedBook,
            year: Number(value.target.value),
          },
        });
        break;
      case 'country':
        this.setState({
          changedBook: {
            ...this.state.changedBook,
            country: value.target.value,
          },
        });
        break;
      case 'pages':
        this.setState({
          changedBook: {
            ...this.state.changedBook,
            pages: Number(value.target.value),
          },
        });
        break;
      case 'stock':
        this.setState({
          changedBook: {
            ...this.state.changedBook,
            stock: Number(value.target.value),
          },
        });
        break;
      default:
        break;
    }
  };

  updateBook = () => {
    // let approved = window.confirm('Save changes? ');
    let changedBook = this.state.changedBook;
    let book = this.state.book;
    // if (approved === true) {
    for (let value in changedBook) {
      if (changedBook[value] !== book[value]) {
        book[value] = changedBook[value];
      }
      // }
      // store.dispatch(editBook(this.state.book));
      this.sendData(book.id);
      this.reference.reset();
      this.setState({ changedBook: {}, showModal: false });
    }
  };

  async sendData(id) {
    let url = `http://localhost:3000/books-list/${id}`;
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.book),
    });
  }

  checkInput = () => {
    let bookDetails = this.state.changedBook;
    if (Object.keys(bookDetails).length > 0) this.setState({ showModal: true });
  };

  render() {
    return (
      <div className={styles.Parent}>
        {this.state.showModal && (
          <Modal
            typeOfMessage='SAVE_CHANGES'
            saveBook={this.updateBook}
            dismissModal={() => this.setState({ showModal: false })}
          />
        )}
        <GetBook callback={this.setBook} />
        <div className={styles.EditBook}>
          <section className={styles.InitialInfo}>
            <label htmlFor='title'>Title</label>
            <input name='title' value={this.state.book.title} readOnly />
            <label htmlFor='author'>Author</label>
            <input name='author' value={this.state.book.author} readOnly />
            <label htmlFor='year'>Year</label>
            <input name='year' value={this.state.book.year} readOnly />
            <label htmlFor='country'>Country</label>
            <input name='country' value={this.state.book.country} readOnly />
            <label htmlFor='pages'>Pages</label>
            <input name='pages' value={this.state.book.pages} readOnly />
            <label htmlFor='stock'>Stock</label>
            <input name='stock' value={this.state.book.stock} readOnly />
          </section>
          <form
            className={styles.EditedInfo}
            ref={(section) => (this.reference = section)}
          >
            <input
              type='text'
              name='title'
              onChange={this.saveBookDetails}
              placeholder='Title'
            />
            <input
              type='text'
              name='author'
              onChange={this.saveBookDetails}
              placeholder='Author'
            />
            <input
              type='number'
              name='year'
              onChange={this.saveBookDetails}
              placeholder='Year'
            />
            <input
              type='text'
              name='country'
              onChange={this.saveBookDetails}
              placeholder='Country'
            />
            <input
              type='number'
              name='pages'
              onChange={this.saveBookDetails}
              placeholder='Pages'
            />
            <input
              type='number'
              name='stock'
              onChange={this.saveBookDetails}
              placeholder='Stock'
            />
          </form>
        </div>
        <button onClick={this.checkInput} className={styles.SaveButton}>
          Save
        </button>
      </div>
    );
  }
}

function GetBook(props) {
  const location = useLocation();
  let book = location.state.book;
  useEffect(() => {
    props.callback(book);
  }, []);
  return null;
}
