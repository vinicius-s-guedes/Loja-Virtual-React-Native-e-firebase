import { createStore } from '@reduxjs/toolkit';

const INITIAL_STATE = {
	data: [
	],
};

function courses(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'ADD_COURSE':
		return { ...state, data: [...state.data, action.product] };
		case 'DELETET_COURSE':
		const commentId = action.product;
		return { ...state, data:[...state.data.filter(product => product.id !== action.product)]};

		default:
		return state;
	}
}

const store = createStore(courses);

export default store;
