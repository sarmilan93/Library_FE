import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/Books.css';
import '../styles/Common.css';
import book from '../assets/book.jpg';
import add from '../assets/add.jpg';
import * as bookService from '../services/bookService';
import { getBooksReducer } from '../redux/bookSlice';

const Books = () => {

    const [bookData, setBookData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const loadBooks = async () => {
            const response = await bookService.getBooks();
            setBookData(response);
        }

        loadBooks(); 
    }, []);

    const openDetailsPage = (id) => {
        dispatch(getBooksReducer(bookData.data));
        navigate('/books/' + id);
    }

    const openAddPage = () => {
        navigate('/addbook');
    }

    return (
        <>
            <h1 className='heading'>Book's Records</h1>
            <div className="grid">
                <div onClick={() => openAddPage()} className="item">
                    <img src={add} alt='add' />
                    <div>Add new book</div>
                </div>

                {bookData?.data?.map((res) => (
                    <div onClick={() => openDetailsPage(res._id)} key={res._id} className="item">
                        <img src={book} alt='book' />
                        <div>{res.name}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Books;