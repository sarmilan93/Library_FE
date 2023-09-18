import './App.css';
import NavBar from './NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authors from './pages/author/Authors';
import Books from './pages/book/Books';
import NotFoundPage from './pages/NotFoundPage';
import BookDetails from './pages/book/BookDetails';
import AddBook from './pages/book/AddBook';
import AuthorDetails from './pages/author/AuthorDetails';
import AddAuthor from './pages/author/AddAuthor';

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
            <Route path='/author/:id' element={<AuthorDetails />} />
            <Route path='/addauthor' element={<AddAuthor />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
