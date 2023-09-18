import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/Common.css';
import * as authorService from '../../services/authorService';

const AddAuthor = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: ''
    });

    const formSubmit = async (e) => {
        e.preventDefault();
        const response = await authorService.addNewAuthor(formData);
        if(response.status === 'success'){
            alert("Successfully Added!");
            navigate('/author');
        }
        else {
            alert(response.message);
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    return (
        <>
            <h1 className='heading'>Add New Author</h1>

            <form onSubmit={formSubmit} className='update-form'>
                <label>
                    First Name:
                    <input type="text" name="first_name" value={formData?.first_name} onChange={handleChange} required />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="last_name" value={formData?.last_name} onChange={handleChange} required />
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default AddAuthor;