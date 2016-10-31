import { LOADED_BOOKS } from '../actions/types.js';
import axios from 'axios';

export function bookAddRequest(bookData) {
	return dispatch => {
		return axios.post('/api/books', bookData);
	}
}

export function isBookExists(identifier){
	return dispatch => {
		return axios.get(`/api/books/checkbook/${identifier}`);
	}
}

export function loadBooks(){
	const request = axios.get('/api/books/getBooks');
	return (dispatch) => {
		request.then(({ data }) => {
			dispatch({ type: LOADED_BOOKS, payload: data })
		});
	}
}