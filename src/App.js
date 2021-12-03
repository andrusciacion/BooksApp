import './App.css';
import NavigationElement from './components/elements/NavigationElement';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/HomeComponent';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavigationElement />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
