import React, { Component, useEffect } from 'react';
import styles from './OffersComponent.module.css';
import BookBox from './elements/BookBox';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import store from '../store';
import { addBookCart } from '../actions';

export default class OffersComponent extends Component {
  state = {
    booksFromStorage: [],
    books: [],
    booksForSearch: [],
    selectedBook: '',
    nrOfBooks: 12,
    currentPage: 1,
    searchValue: '',
    noBook: 'none',
    display: 'flex',
  };

  componentDidMount() {
    // this.getBooksFromStore().then(this.getBooksList());
    this.getBooks();
    this.scrollToTop();
  }

  async getBooks() {
    let url = 'http://localhost:3000/books-list';
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ booksFromStorage: data });
      })
      .then(() => this.getBooksList());
  }

  async getBooksFromStore() {
    this.state.booksFromStorage = store.getState();
  }

  getBooksList() {
    let data = [];
    data[0] = [];
    let page = this.state.currentPage;
    let nrOfBooks = this.state.nrOfBooks;
    console.log(this.state.booksFromStorage);
    this.state.booksFromStorage.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
    this.state.booksFromStorage.forEach((item, key) => {
      if (key < page * nrOfBooks) {
        data[page - 1].push(item);
      } else {
        page++;
        data[page - 1] = [];
        data[page - 1].push(item);
      }
      this.setState({
        books: data,
        currentPage: 0,
        noBook: 'none',
        display: 'none',
      });
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
    let input = value.target.value;
    if (input === '') this.getBooksList();
    this.setState({ searchValue: input });
    let bookArray = [];
    bookArray[0] = [];
    this.state.booksFromStorage.forEach((book) => {
      let bookTitle = book.title.toLowerCase();
      if (bookTitle.indexOf(input.toLowerCase()) >= 0) {
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

  addToStoreCart = () => {
    store.dispatch(addBookCart({ quantity: 1 }));
  };

  render() {
    let currentPage = [];
    return (
      <div className={styles.OffersComponent}>
        {/* <GetStoredBooks useCallback={this.displayBooks} /> */}
        <div className={styles.SearchBar}>
          <input
            list='search'
            className={styles.SearchInput}
            type='text'
            placeholder='Search ...'
            value={this.state.searchValue}
            onChange={(event) => this.updateSearchValue(event)}
          />

          <datalist id='search'>
            {this.state.booksFromStorage.map((item, key) => (
              <option key={key}>{item.title}</option>
            ))}
          </datalist>

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
        <DisplayLoadingScreen display={this.state.display} />
        <div className={styles.BooksList}>
          {this.state.books.forEach((item, key) => {
            if (this.state.currentPage === key) {
              currentPage = item;
            }
          })}

          {currentPage.map((item, key) => {
            if (item === 'null') {
              this.searchBookStatus();
              return null;
            } else {
              return (
                <div>
                  {item.stock === 0 && (
                    <p className={styles.StockOut}>Out of stock</p>
                  )}
                  <BookBox
                    key={key}
                    books={item}
                    style={{
                      transform: 'scale(1)',
                      background: '#6600ff15',
                      cursor: 'pointer',
                      paddingBlock: '20px',
                    }}
                  />
                  {/* </Link> */}
                </div>
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
              {this.state.currentPage +
                1 +
                ' ... ' +
                [
                  this.state.books.length === 0
                    ? this.state.books.length + 1
                    : this.state.books.length,
                ]}
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

function DisplayLoadingScreen(display) {
  return (
    <div
      style={{ display: `${display.display}` }}
      className={styles.LoadingScreenText}
    >
      <div className={styles.LoadingScreen} />
    </div>
  );
}

// function GetStoredBooks(props) {
//   const books = useSelector((list) => list);
//   // useEffect(() => {
//   props.useCallback(books);
//   // });
//   return null;
// }
