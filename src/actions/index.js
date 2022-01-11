export const addBook = (value) => {
  return {
    type: 'ADD_BOOK',
    book: value,
  };
};

export const editBook = (value) => {
  return {
    type: 'EDIT_BOOK',
    book: value,
  };
};

export const addBookCart = (value) => {
  return {
    type: 'ADD_CART',
    number: value,
  };
};
