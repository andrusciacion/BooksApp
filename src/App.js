import NavigationBar from './components/elements/NavigationBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/HomeComponent';
import Offers from './components/OffersComponent';
import BookDetails from './components/BookDetailsComponent';
import CartComponent from './components/CartComponent';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar id='navigation' />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/details' element={<BookDetails />} />
          <Route path='/cart' element={<CartComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
