import React, { Component } from 'react';
import Favourites from '../contentImages/favourites.svg';
import BookBox from './elements/BookBox';
import styles from './FavouritesComponent.module.css';

export default class FavouritesComponent extends Component {
  state = {
    favouriteBooks: [],
  };

  componentDidMount() {
    this.getBooks();
  }

  componentDidUpdate() {
    console.log('update');
  }

  async getBooks() {
    let url = 'http://localhost:3000/books-list';
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let newArr = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].favourite) {
            newArr.push(data[i]);
          }
        }
        this.setState({ favouriteBooks: newArr });
      })
      .then(() => console.log(this.state.favouriteBooks));
  }

  render() {
    return (
      <div className={styles.FavouriteBooks}>
        {this.state.favouriteBooks.length > 0 ? (
          <div className={styles.Books}>
            {this.state.favouriteBooks.map((item, key) => (
              <div key={key} className={styles.FavouriteBox}>
                {item.stock === 0 && (
                  <p className={styles.StockOut}>Out of stock</p>
                )}
                <FavouriteList key={key} book={item} />
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

function FavouriteList(props) {
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
      <p className={styles.NoFavouriteText}>There are no favorite books...</p>
      <img className={styles.Image} src={Favourites} alt='Favourites' />
    </>
  );
}
