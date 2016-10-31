import React from 'react';
import { Link } from 'react-router';

export default () => {
	return (
		<nav className="navbar navbar-default">
			<div className="container-fluid">
				<div className="navbar-header">
					<Link to="/" className="navbar-brand">Ebangla</Link>
				</div>
				<div className="collapse navbar-collapse">
					<ul className="nav navbar-nav navbar-right">
						<li><Link to="/add_book">Add Book</Link></li>
						<li><Link to="/books">Books</Link></li>
					</ul>
				</div>
			</div>
		</nav>
	)
}