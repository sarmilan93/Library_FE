import axios from "axios";

const BASE_URL = "http://localhost:8000/library/bookapi/";

export const getBooks = async() => {
    const response = await axios.get(BASE_URL + "books");
    return response.data;
}

export const getBookById = async(id) => {
    const response = await axios.get(BASE_URL + "book/" + id);
    return response.data;
}

export const updateBookById = async(id, data) => {
    const response = await axios.put(BASE_URL + "book/" + id, data);
    return response.data;
}

export const addNewBook = async(data) => {
    const response = await axios.post(BASE_URL + "book", data);
    return response.data;
}