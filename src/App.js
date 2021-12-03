import NavigationBar from './components/elements/NavigationBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/HomeComponent';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
