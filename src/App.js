import './App.css';
import NavBar from './NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authors from './pages/Authors';
import Books from './pages/Books';
import NotFoundPage from './pages/NotFoundPage';
import BookDetails from './pages/BookDetails';
import AddBook from './pages/AddBook';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <div id="page-body">
          <Routes>
            <Route path='/' element={<Books />} />
            <Route path='/books' element={<Books />} />
            <Route path='/books/:id' element={<BookDetails />} />
            <Route path='/addbook' element={<AddBook />} />
            <Route path='/author' element={<Authors />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
