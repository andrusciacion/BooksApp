import NavigationBar from './components/elements/NavigationBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/HomeComponent';
import Offers from './components/OffersComponent';
import BookDetails from './components/BookDetailsComponent';
import CartComponent from './components/CartComponent';
import BookForm from './components/BookFormComponent';
import Edit from './components/EditComponent';
import Favourites from './components/FavouritesComponent';
import store from './store';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar props={store} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/details' element={<BookDetails />} />
          <Route path='/cart' element={<CartComponent />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='/add-book' element={<BookForm />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/contact' element={null} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
