import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/Common.css';
import '../../styles/BookDetails.css';
import book from '../../assets/book.jpg';
import * as bookService from '../../services/bookService';
import * as authorService from '../../services/authorService';
import NotFoundPage from '../NotFoundPage';

const BookDetails = () => {
    const { id } = useParams();
    let bookDataState = useSelector((state) => state.data);

    if(bookDataState.length > 0){
        localStorage.setItem("bookDataState", JSON.stringify(bookDataState));
    }

    let item = localStorage.getItem("bookDataState");
    if(item !== 'undefined'){
        bookDataState = JSON.parse(item);
    }

    const [bookDetails, setBookDetails] = useState(null);
    const [author, setAuthor] = useState('');
    const [authorsData, setAuthorsData] = useState(null);
    const [formState, setFormState] = useState(false);
    const [formData, setFormData] = useState(null);

    const currentBookDetails = bookDataState.find(res => res._id == id);

    useEffect(() => {
        const loadBookById = async () => {
            const response = await bookService.getBookById(id);
            setBookDetails(response.data);

            const authorDetails = await authorService.getAuthorById(response?.data?.author);
            setAuthor(authorDetails.data)

            const authorResponse = await authorService.getAuthors();
            setAuthorsData(authorResponse.data);

            setFormData({
                name: response?.data?.name,
                isbn: response?.data?.isbn,
                author: response?.data?.author
            });
        }

        if(currentBookDetails){
            loadBookById();
        }
    }, [])

    if(!currentBookDetails){
        return <NotFoundPage />
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        const response = await bookService.updateBookById(id, formData);
        if(response.status == 'success'){
            setFormState(false);
            alert("Successfully updated!");
            window.location.reload(true);
        }
        else {
            alert(response.message);
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const editForm = () => {
        setFormState(true);
    }

    return (
    <>
        <h1 className='heading'>Book Details</h1>
        <div className="container">
            <div className="bookimage">
                <img src={book} alt='book'/>
            </div>
            <div className="text">
                <div><span className='details'>Name : </span> {bookDetails?.name}</div>
                <div><span className='details'>ISBN : </span> {bookDetails?.isbn}</div>
                <div><span className='details'>Author : </span> {author?.first_name} {author?.last_name}</div>
                <button className='book-edit-button' onClick={() => editForm()}>Edit</button>
            </div>
        </div>

        {formState && <form onSubmit={formSubmit} className='update-form'>
            <h1 className='heading'> Update Book Details</h1>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                ISBN:
                <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} required />
            </label>
            <label>
                Author:
                <select name="author" value={formData.author} onChange={handleChange} required>
                    {authorsData?.map((res) => (
                        <option key={res._id} value={res._id}>{res.first_name} {res.last_name}</option>
                    ))}
                </select>
            </label>
            <button type="submit">Submit</button>
        </form>}
    </>
)};

export default BookDetails;