import express from 'express';
import commonValidations from '../shared/validations/book';
// import bcrypt from 'bcryptjs';
import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';

import Book from '../models/book';

let router = express.Router();

function validateInput(data, otherValidations){
	let { errors } = otherValidations(data);

	return Book.find({ name: data.name }).then(book => {
		if (book) {
	      	if (book.name === data.name) {
	        	errors.name = 'There is book with such name';
	      	}
		}
    	return {
      		errors,
      		isValid: isEmpty(errors)
    	};
	})
}

// check book in db by name
router.get('checkbook/:identifier', (req, res) => {
  Book.find({ name: req.params.identifier }).then(book => {
    res.json({ book });
  });
});

// get all books
router.get('/getBooks', (req, res, next) =>{
	Book.find().sort({ 'createdAt': 'desc' }).exec(function(err, books){
		if (err) return next(err);
		return res.send(books);
 	});
});

// insert books information
router.post('/', (req, res) => {
	validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
		if(isValid){
			const { category, name, writer, publication, price, release_date, edition } = req.body;

			var newBook = new Book({
				category: category, 
				name: name, 
				writer: writer, 
				publication: publication, 
				price: price, 
				release_date: release_date, 
				edition: edition
			});

			// Create Book
			Book.createBook(newBook, function(err, book){
				if(err) res.status(500).json({ error: err });
				res.json({ success: true });
			});
		}else{
			res.status(400).json(errors);
		}
	});

	
});

export default router;