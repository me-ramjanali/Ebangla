import React from 'react';
import category from '../../data/category';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/book';
import TextFieldGroup from '../common/TextFieldGroup';

class BookAddForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			writer: '',
			publication: '',
			category: '',
			price: '',
			release_date: '',
			edition: '',
			errors: {},
			isLoading: false
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.checkBookExists = this.checkBookExists.bind(this);
	}

	onChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);

		if(!isValid) {
			this.setState({ errors });
		}

		return isValid;
	}

	checkBookExists(e) {
		const field = e.target.name;
		const val = e.target.value;
		if(val !== ''){
			this.props.isBookExists(val).then(res => {
				let errors = this.state.errors;
				if(res.data.book){
					errors[field] = 'There is book with such ' + field;
				}else{
					errors[field] = '';
				}
				this.setState({ errors });
			});
		}
	}

	onSubmit(e){
		e.preventDefault();
		if(this.isValid()){
			this.setState({ errors: {}, isLoading: true });
			this.props.bookAddRequest(this.state).then(
				() => {
					this.props.addFlashMessage({
						type: 'success',
						text: 'Book Added successfully'
					});
					this.context.router.push('/books');
				},
				({ data }) => this.setState({ errors: data, isLoading: false })
			)
		}
	}

	render() {
		const { errors } = this.state;
		const options = map(category, (val, key) =>
			<option key={val} value={val}>{key}</option>
		);
		return (
			<form onSubmit={this.onSubmit}>
				<h1>Fill the from and Submit</h1>
				<div className={classnames("form-group", { 'has-error': errors.category})}>
					<label className="control-label">Category</label>
					<select 
						name="category" 
						className="form-control"
						onChange={this.onChange}
						value={this.state.category}
					>
						<option value="" disabled>Choose Category</option>
						{options}
					</select>
					{errors.category && <span className="help-block">{errors.category}</span>}
				</div>
				<TextFieldGroup 
					error={errors.name}
					label="Name"
					onChange={this.onChange}
					checkBookExists={this.checkBookExists}
					value={this.state.name}
					field="name"
				/>
				<TextFieldGroup 
					error={errors.writer}
					label="Writer"
					onChange={this.onChange}
					value={this.state.writer}
					field="writer"
				/>
				<TextFieldGroup 
					error={errors.publication}
					label="Publication"
					onChange={this.onChange}
					value={this.state.publication}
					field="publication"
				/>
				<TextFieldGroup 
					error={errors.price}
					label="Price"
					onChange={this.onChange}
					value={this.state.price}
					field="price"
				/>
				<TextFieldGroup 
					error={errors.release_date}
					label="Release Date"
					onChange={this.onChange}
					value={this.state.release_date}
					field="release_date"
				/>
				<TextFieldGroup 
					error={errors.edition}
					label="Edition"
					onChange={this.onChange}
					value={this.state.edition}
					field="edition"
				/>
				<div className="form-group">
					<button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
						Submit
					</button>
				</div>
			</form>
		);
	}
}

BookAddForm.propTypes = {
	bookAddRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired,
	isBookExists: React.PropTypes.func.isRequired
}

BookAddForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default BookAddForm;