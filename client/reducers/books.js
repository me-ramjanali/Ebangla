import { LOADED_BOOKS } from '../actions/types.js';

export default (state = [], action = {}) => {
	switch(action.type){
		case LOADED_BOOKS:
			return action.payload;
			return state;

		default: return state;
	}
}