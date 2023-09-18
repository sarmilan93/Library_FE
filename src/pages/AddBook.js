import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authorService from '../services/authorService';
import * as bookService from '../services/bookService';

const AddBook = () => {
    const [formData, setFormData] = useState({
        name: '',
        isbn: '',
        author: 'Select Author'
    });
    const [authorsData, setAuthorsData] = useState();
    const [authorFormValue, setauthorFormValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadAuthors = async () => {
            const authorResponse = await authorService.getAuthors();
            setAuthorsData(authorResponse.data);
        }

        loadAuthors();
    }, [])

    const formSubmit = async (e) => {
        e.preventDefault();
        const response = await bookService.addNewBook(formData);
        if(response.status == 'success'){
            alert("Successfully updated!");
            navigate('/books');
        }
        else {
            alert(response.message);
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name == 'author'){
            setauthorFormValue(value);
        }
        setFormData({ ...formData, [name]: value });

    };

    return (
        <>
            <h1 className='heading'>Add New Book</h1>

            <form onSubmit={formSubmit} className='update-form'>
                <label>
                    Name:
                    <input type="text" name="name" value={formData?.name} onChange={handleChange} required />
                </label>
                <label>
                    ISBN:
                    <input type="text" name="isbn" value={formData?.isbn} onChange={handleChange} required />
                </label>
                <label>
                    Author:
                    <select name="author" placeholder='Text' value={authorFormValue}onChange={handleChange} required>
                        <option value="" disabled>
                            Select an option...
                        </option>
                        {authorsData?.map((res) => (
                            <option key={res?._id} value={res?._id}>{res?.first_name} {res?.last_name}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AddBook;