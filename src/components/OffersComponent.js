import React, { Component } from 'react';
import styles from './OffersComponent.module.css';
import books from '../books/books.json';
import BookBox from './elements/BookBox';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

export default class OffersComponent extends Component {
  state = {
    books: [],
    booksForSearch: [],
    selectedBook: '',
    nrOfBooks: 8,
    currentPage: 1,
    searchValue: '',
    noBook: 'none',
  };

  componentDidMount() {
    this.getBooksList();
    this.scrollToTop();
  }

  getBooksList() {
    let data = [];
    data[0] = [];
    let page = this.state.currentPage;
    let nrOfBooks = this.state.nrOfBooks;
    books.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
    books.forEach((item, key) => {
      if (key < page * nrOfBooks) {
        data[page - 1].push(item);
      } else {
        page++;
        data[page - 1] = [];
        data[page - 1].push(item);
      }
      this.setState({ books: data });
      this.setState({ currentPage: 0 });
      this.setState({ noBook: 'none' });
    });
  }

  goToFirstPage() {
    if (this.state.currentPage !== 0) {
      this.setState({ currentPage: 0 });
      this.scrollToTop();
    }
  }

  goToLastPage() {
    if (this.state.currentPage !== this.state.books.length - 1) {
      this.setState({ currentPage: this.state.books.length - 1 });
      this.scrollToTop();
    }
  }

  goToNextPage() {
    let currentPage = this.state.currentPage;
    let nrOfPages = this.state.books.length;
    if (
      currentPage < nrOfPages - 1 &&
      this.state.currentPage !== this.state.books.length - 1
    ) {
      this.setState({ currentPage: (currentPage += 1) });
      this.scrollToTop();
    }
  }

  goToPreviousPage() {
    let currentPage = this.state.currentPage;
    if (currentPage > 1 && this.state.currentPage !== 0) {
      this.setState({ currentPage: (currentPage -= 1) });
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  searchBook() {
    let input = this.state.searchValue;
    if (input === '' || input.length < 3) return;
    if (this.state.booksForSearch.length > 0) {
      this.setState({ books: this.state.booksForSearch });
      this.setState({ booksForSearch: [] });
    }
  }

  updateSearchValue(value) {
    let input = value.target.value.toLowerCase();
    if (input === '') this.getBooksList();
    this.setState({ searchValue: input });
    let bookArray = [];
    bookArray[0] = [];
    books.map((book) => {
      let bookTitle = book.title.toLowerCase().match(/\w+/g);
      if (bookTitle.indexOf(input) >= 0) {
        bookArray[0].push(book);
      } else {
        return;
      }
    });
    if (bookArray[0].length > 0) {
      this.setState({ booksForSearch: bookArray });
    } else {
      bookArray[0].push('null');
      this.setState({ booksForSearch: bookArray });
    }
  }

  searchBookStatus = () => {
    if (this.state.noBook === 'none') {
      this.setState({ noBook: '' });
    }
  };

  render() {
    let currentPage = [];
    return (
      <div className={styles.OffersComponent}>
        <div className={styles.SearchBar}>
          <input
            className={styles.SearchInput}
            type='text'
            placeholder='Search ...'
            value={this.state.searchValue}
            onChange={(event) => this.updateSearchValue(event)}
          />
          <div
            className={styles.SearchButton}
            onClick={() => this.searchBook()}
          >
            <BsSearch style={{ color: 'white', fontSize: '30px' }} />
          </div>
        </div>
        <div
          style={{ display: `${this.state.noBook}` }}
          className={styles.NoBooks}
        >
          We can't find this book
        </div>
        <div className={styles.BooksList}>
          {this.state.books.forEach((item, key) => {
            if (this.state.currentPage === key) {
              currentPage = item;
            }
          })}
          {currentPage.map((item, key) => {
            if (item === 'null') {
              this.searchBookStatus();
              return;
            } else {
              return (
                <Link
                  key={key}
                  className={styles.Link}
                  to={{ pathname: '/details' }}
                  state={{ book: item }}
                >
                  <BookBox
                    books={item}
                    style={{
                      transform: 'scale(1)',
                      background: '#6600ff15',
                      cursor: 'pointer',
                      paddingBlock: '20px',
                    }}
                  />
                </Link>
              );
            }
          })}
        </div>
        <div
          className={styles.Pagination}
          style={{
            display: `${this.state.noBook === 'none' ? '' : 'none'}`,
          }}
        >
          <button
            className={styles.ButtonMargin}
            onClick={() => this.goToFirstPage()}
          >
            {'<<'}
          </button>
          <div className={styles.MiddleButtons}>
            <button
              className={styles.ButtonMiddle}
              onClick={() => this.goToPreviousPage()}
            >
              Previous
            </button>
            <div className={styles.PageNumber}>
              {this.state.currentPage + 1 + ' ... ' + this.state.books.length}
            </div>
            <button
              className={styles.ButtonMiddle}
              onClick={() => this.goToNextPage()}
            >
              Next
            </button>
          </div>

          <button
            className={styles.ButtonMargin}
            onClick={() => this.goToLastPage()}
          >
            {'>>'}
          </button>
        </div>
      </div>
    );
  }
}
