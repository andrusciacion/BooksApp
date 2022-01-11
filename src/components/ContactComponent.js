import React, { Component } from 'react';
import styles from './ContactComponent.module.css';
import Contact from '../contentImages/contact.svg';

export default class ContactComponent extends Component {
  state = {
    contactForm: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      message: '',
    },
    wrongEmail: true,
  };

  // async sendData() {
  //   let url = 'http://localhost:3000/contact';
  //   await fetch(url)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       this.setState({ booksFromStorage: data });
  //     })
  //     .then(() => this.getBooksList());
  // }

  saveFormData(input) {
    switch (input.target.name) {
      case 'firstName':
        this.setState({
          contactForm: {
            ...this.state.contactForm,
            firstName: input.target.value,
          },
        });
        break;
      case 'lastName':
        this.setState({
          contactForm: {
            ...this.state.contactForm,
            lastName: input.target.value,
          },
        });
        break;
      case 'email':
        let check = this.checkForEmail(input.target.value);
        if (check) {
          this.setState({
            contactForm: {
              ...this.state.contactForm,
              email: input.target.value,
            },
            wrongEmail: false,
          });
        } else {
          this.setState({ wrongEmail: true });
        }

        break;
      case 'phoneNumber':
        this.setState({
          contactForm: {
            ...this.state.contactForm,
            phone: input.target.value,
          },
        });
        break;
      case 'address':
        this.setState({
          contactForm: {
            ...this.state.contactForm,
            address: input.target.value,
          },
        });
        break;
      case 'message':
        this.setState({
          contactForm: {
            ...this.state.contactForm,
            message: input.target.value,
          },
        });
        break;
      default:
        break;
    }
  }

  checkForEmail(text) {
    let regex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(text);
  }

  async sendData() {
    let url = `http://localhost:3000/contact`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.contactForm),
    });
  }

  render() {
    return (
      <div className={styles.Contact}>
        <img className={styles.Image} src={Contact} alt='Contact' />
        <form action='#' className={styles.ContactForm}>
          <h1>Contact Us</h1>
          <div className={styles.FirstLastName}>
            <input
              type='text'
              name='firstName'
              placeholder='First name'
              onChange={(input) => this.saveFormData(input)}
              required
            />
            <input
              type='text'
              name='lastName'
              placeholder='Last name'
              onChange={(input) => this.saveFormData(input)}
              required
            />
          </div>
          <div className={styles.EmailPhone}>
            <input
              type='text'
              name='email'
              className={styles.EmailInput}
              placeholder='Email'
              onChange={(input) => this.saveFormData(input)}
              style={this.state.wrongEmail ? {} : { borderColor: 'green' }}
              required
            />
            <input
              type='number'
              name='phoneNumber'
              placeholder='Phone'
              onChange={(input) => this.saveFormData(input)}
              required
            />
          </div>
          <input
            type='text'
            name='address'
            placeholder='Address'
            onChange={(input) => this.saveFormData(input)}
            required
          />
          <textarea
            name='message'
            cols='20'
            rows='6'
            onChange={(input) => this.saveFormData(input)}
            placeholder='Type your message...'
            required
          ></textarea>
          <button className={styles.SendButton} onClick={() => this.sendData()}>
            Send
          </button>
        </form>
      </div>
    );
  }
}
