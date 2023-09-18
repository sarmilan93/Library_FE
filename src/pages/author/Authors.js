import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../../styles/Books.css';
import '../../styles/Common.css';
import add from '../../assets/add.jpg';
import author from '../../assets/author.jpg';
import * as authorService from '../../services/authorService'
import { getDataReducer } from '../../redux/dataSlice';

const Authors = () => {
    const [authorsData, setbauthorsData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const loadAuthors = async () => {
            const response = await authorService.getAuthors();
            setbauthorsData(response.data.reverse());
        }

        loadAuthors(); 
    }, []);

    const openAddPage = () => {
        navigate('/addauthor');
    }

    const openDetailsPage = (id) => {
        dispatch(getDataReducer(authorsData));
        navigate('/author/' + id);
    }

    return (
        <>
            <h1 className='heading'>Author's Records</h1>

            <div className="grid">
                <div onClick={() => openAddPage()} className="item">
                    <img src={add} alt='add' />
                    <div>Add new Author</div>
                </div>

                {authorsData?.map((res) => (
                    <div onClick={() => openDetailsPage(res._id)} key={res._id} className="item">
                        <img src={author} alt='book' />
                        <div>{res.first_name} {res.last_name}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Authors;