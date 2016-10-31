import React from 'react';
import Book from './Book';
import { connect } from 'react-redux';
import { loadBooks } from '../../actions/bookActions';

class ListBookPage extends React.Component {
	componentWillMount() {
	    this.props.loadBooks();
  	}

  	render() {
  		const books = this.props.books.map((book, i) => {
			return (<Book key={book._id} book={book} />);
		});

	    return (
	    	<div className="row">
				{books}
	    	</div>
	    );
  	}
}

ListBookPage.propTypes = {
	books: React.PropTypes.array.isRequired
}

function mapStateToProps (state) {
  	return { books: state.books };
}

export default connect(mapStateToProps, { loadBooks })(ListBookPage);