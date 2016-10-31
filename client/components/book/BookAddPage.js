import React from 'react';
import BookAddForm from './BookAddForm';
import { connect } from 'react-redux';
import { bookAddRequest, isBookExists } from '../../actions/bookActions';
import { addFlashMessage } from '../../actions/flashMessages.js';

class BookAddPage extends React.Component {
	render() {
		const { bookAddRequest, addFlashMessage, isBookExists } = this.props;
		return (
			<div className="row">
				<div className="col-md-8 col-md-offset-2">
					<BookAddForm 
						bookAddRequest={bookAddRequest} 
						addFlashMessage={addFlashMessage} 
						isBookExists={isBookExists}
					/>
				</div>
			</div>
		)
	}
}

BookAddPage.propTypes = {
	bookAddRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired,
	isBookExists: React.PropTypes.func.isRequired
}

export default connect(null, { bookAddRequest, addFlashMessage, isBookExists })(BookAddPage);