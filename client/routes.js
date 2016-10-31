import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import BookAddPage from './components/book/BookAddPage';
import ListBookPage from './components/book/ListBookPage';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Greetings} />
		<Route path="add_book" component={BookAddPage} />
		<Route path="books" component={ListBookPage} />
	</Route>
)