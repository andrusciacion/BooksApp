import React, { Component } from 'react';
import styles from './Delivery.module.css';
import { FaShippingFast } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { addBookCart } from '../actions';
import store from '../store';

export default class DeliveryComponent extends Component {
  state = {
    books: [],
    totalPrice: 0,
    redirect: false,
  };

  componentDidMount() {
    this.getBooks();
  }

  async getBooks() {
    let url = 'http://localhost:3000/cart';
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ books: data });
        this.calculateTotalPrice();
      });
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    this.state.books.forEach((book) => {
      totalPrice += book.quantity * book.price;
    });
    this.setState({ totalPrice: totalPrice });
  }

  async orderBooks() {
    let url = 'http://localhost:3000/';
    this.state.books.map((item) => {
      let book = { ...item, quantity: 0 };
      fetch(url + 'books-list/' + item.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      }).then(
        fetch(url + 'cart/' + item.id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });
    this.setState({ redirect: true });
    store.dispatch(addBookCart({ quantity: 1 }));
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to='/offers' />;
    }
    return (
      <div className={styles.Parent}>
        <h1>Ordered Books</h1>
        <div className={styles.OrderList}>
          {this.state.books.map((item, key) => (
            <DisplayOrdereBooks key={key} books={item} />
          ))}
        </div>
        <h1>Delivery Details</h1>
        <div className={styles.DeliveryForm}>
          <div className={styles.DeliveryDetails}>
            <label htmlFor='county'>County</label>
            <input type='text' name='county' placeholder='County' />
            <label htmlFor='city'>City</label>
            <input type='text' name='city' placeholder='City' />
            <label htmlFor='street'>Street</label>
            <input type='text' name='street' placeholder='Street' />
            <label htmlFor='number'>Number</label>
            <input type='number' name='number' placeholder='Number' />
            <label htmlFor='code'>Postal Code</label>
            <input type='number' name='code' placeholder='Postal Code' />
          </div>
          <div className={styles.OrderDetails}>
            <h2>Total Price: {this.state.totalPrice} $</h2>
            <div>
              <FaShippingFast style={{ fontSize: 40 }} />
              <p>You will receive your package in 2-3 days</p>
            </div>
            <button className={styles.Button} onClick={() => this.orderBooks()}>
              Order
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function DisplayOrdereBooks(props) {
  return (
    <div className={styles.OrderedBooks}>
      <img src={props.books.imageLink} alt='BookImage' />
      <p>{props.books.title}</p>
    </div>
  );
}
