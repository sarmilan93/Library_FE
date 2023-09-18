import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/Common.css';
import '../../styles/BookDetails.css';
import author from '../../assets/author.jpg';
import * as authorService from '../../services/authorService'
import NotFoundPage from '../NotFoundPage';

const AuthorDetails = () => {

    const { id } = useParams();
    let authorDataState = useSelector((state) => state.data);

    if(authorDataState.length > 0){
        localStorage.setItem("authorDataState", JSON.stringify(authorDataState));
    }

    let item = localStorage.getItem("authorDataState");
    if(item !== 'undefined'){
        authorDataState = JSON.parse(item);
    }

    const [authorDetails, setauthorDetailss] = useState(null);
    const [formState, setFormState] = useState(false);
    const [formData, setFormData] = useState(null);

    const currentAuthorDetails = authorDataState.find(res => res._id === id);

    useEffect(() => {
        const loadAuthor = async () => {
            const response = await authorService.getAuthorById(id);
            setauthorDetailss(response.data);

            setFormData({
                first_name: response?.data?.first_name,
                last_name: response?.data?.last_name
            });
        }

        loadAuthor();
    }, [id]);

    if(!currentAuthorDetails){
        return <NotFoundPage />
    }

    const editForm = () => {
        setFormState(true);
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        const response = await authorService.updateAuthorById(id, formData);
        if(response.status === 'success'){
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

    return(
        <>
            <h1 className='heading'>Author Details</h1>

            <div className="container">
                <div className="bookimage">
                    <img src={author} alt='book'/>
                </div>
                <div className="text">
                    <div><span className='details'>First Name : </span> {authorDetails?.first_name}</div>
                    <div><span className='details'>Last Name : </span> {authorDetails?.last_name}</div>
                    <button className='book-edit-button' onClick={() => editForm()}>Edit</button>
                </div>
            </div>

            {formState && <form onSubmit={formSubmit} className='update-form'>
                <h1 className='heading'> Update Author Details</h1>
                <label>
                    First Name:
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </label>
                <button type="submit">Submit</button>
            </form>}
        </>
    );
}

export default AuthorDetails;