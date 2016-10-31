import React from 'react';

class Book extends React.Component{

	render() {
		const { category, name, writer, publication, price, release_date, edition } = this.props.book;
		return (
			<div className="col-md-3">
	          	<div className="thumbnail">
	              	<div className="caption">
		                <h2>{name}</h2>
		                <p><strong>Category</strong>: {category}</p>
		                <p><strong>Writer</strong>: {writer}</p>
		                <p><strong>Publication</strong>: {publication}</p>
		                <p><strong>Price</strong>: {price}</p>
		                <p><strong>Release date</strong>: {release_date}</p>
		                <p><strong>Edition</strong>: {edition}</p>
	            	</div>
	          	</div>
	        </div>
		)
	}
}

Book.propTypes = {
	book: React.PropTypes.object.isRequired
}

export default Book;