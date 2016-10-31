import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
	let errors = {};

	if(Validator.isEmpty(data.name)){
		errors.name = 'This field is required';
	}
	if(Validator.isEmpty(data.category)){
		errors.category = 'This field is required';
	}
	if(Validator.isEmpty(data.writer)){
		errors.writer = 'This field is required';
	}
	if(Validator.isEmpty(data.publication)){
		errors.publication = 'This field is required';
	}
	if(Validator.isEmpty(data.price)){
		errors.price = 'This field is required';
	}
	if(!Validator.isNumeric(data.price)){
		errors.price = 'Invalid';
	}
	if(Validator.isEmpty(data.release_date)){
		errors.release_date = 'This field is required';
	}
	if(Validator.isEmpty(data.edition)){
		errors.edition = 'This field is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
}