import React, { Component } from 'react';
import styles from './BookFormComponent.module.css';
import { Navigate } from 'react-router-dom';
// import { addBook } from '../actions/index';
// import store from '../store';

export default class BookFormComponent extends Component {
  state = {
    book: {
      title: '',
      author: '',
      year: '',
      country: '',
      pages: '',
      imageLink: 'images/the-divine-comedy.jpg',
      price: '',
      stock: '',
    },
    redirect: false,
  };

  componentDidMount() {
    // this.setState({
    //   book: { ...this.state.book, id: store.getState().length },
    // });
    this.getBooks();
  }

  async getBooks() {
    let url = 'http://localhost:3000/books-list';
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ id: data.length });
        console.log(data.length);
      });
  }

  saveBookDetails = (value) => {
    switch (value.target.name) {
      case 'title':
        this.setState({
          book: { ...this.state.book, title: value.target.value },
        });
        break;
      case 'author':
        this.setState({
          book: { ...this.state.book, author: value.target.value },
        });
        break;
      case 'year':
        this.setState({
          book: { ...this.state.book, year: Number(value.target.value) },
        });
        break;
      case 'country':
        this.setState({
          book: { ...this.state.book, country: value.target.value },
        });
        break;
      case 'pages':
        this.setState({
          book: { ...this.state.book, pages: Number(value.target.value) },
        });
        break;
      case 'price':
        this.setState({
          book: { ...this.state.book, price: Number(value.target.value) },
        });
        break;
      case 'stock':
        this.setState({
          book: { ...this.state.book, stock: Number(value.target.value) },
        });
        break;
      default:
        break;
    }
  };

  // submitBook = () => {
  //   let check = this.checkInput();
  //   if (check) {
  //     store.dispatch(addBook(this.state.book));
  //   }
  // };

  async submitBook() {
    let check = this.checkInput();
    if (check) {
      let url = `http://localhost:3000/books-list`;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.book),
      }).then(() => this.setState({ redirect: true }));
    }
  }

  checkInput() {
    const book = this.state.book;
    for (let item in book) {
      if (book[item] === '') {
        return false;
      }
    }
    return true;
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to='/offers' />;
    }
    return (
      <div className={styles.Parent}>
        {/* <GetStoredBooks useCallback={this.test} /> */}

        {/* <form onSubmit={this.submitBook} className={styles.Form}> */}
        <div className={styles.Form}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            value={this.state.book.title}
            placeholder='Book title'
            required
            onChange={this.saveBookDetails}
          />
          <label htmlFor='author'>Author</label>
          <input
            type='text'
            name='author'
            value={this.state.book.author}
            placeholder='Author'
            required
            onChange={this.saveBookDetails}
          />
          <label htmlFor='year'>Year</label>
          <input
            type='number'
            name='year'
            value={this.state.book.year}
            placeholder='Year'
            required
            onChange={this.saveBookDetails}
          />
          <label htmlFor='country'>Country</label>
          <input
            type='text'
            name='country'
            value={this.state.book.country}
            placeholder='Country'
            required
            onChange={this.saveBookDetails}
          />
          <label htmlFor='pages'>Pages</label>
          <input
            type='number'
            name='pages'
            value={this.state.book.pages}
            placeholder='Pages'
            onChange={this.saveBookDetails}
            required
          />
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            name='price'
            value={this.state.book.price}
            placeholder='Price'
            onChange={this.saveBookDetails}
            required
          />
          <label htmlFor='stock'>Stock</label>
          <input
            type='number'
            name='stock'
            value={this.state.book.stock}
            placeholder='Stock'
            onChange={this.saveBookDetails}
            required
          />
          {/* <SumbitButton data={this.state.book} /> */}
          <button onClick={() => this.submitBook()} className={styles.Button}>
            Add book
          </button>
          {/* </form> */}
        </div>
      </div>
    );
  }
}

// function GetStoredBooks(props) {
//   const books = useSelector((list) => list);
//   useEffect(() => {
//     props.useCallback(books);
//   }, []);
//   return null;
// }

// function SumbitButton(props) {
//   const dispatch = useDispatch();
//   console.log(props);
//   const submitBook = () => {
//     dispatch(addBook(props));
//     // addBook();
//     // console.log(props);
//   };
//   return (
//     <button className={styles.Button} onClick={submitBook}>
//       Add Book
//     </button>
//   );
// }
