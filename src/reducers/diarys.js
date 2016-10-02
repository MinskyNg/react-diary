import { ADD_CAT, DEL_CAT, ADD_POST, DEL_POST } from '../constants/actionTypes';
import { fromJS } from 'immutable';


function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;
    };
}

const handlers = {};

handlers[ADD_CAT] = (state, action) => {
    const { cat } = action;
    const len = state.size;
    for (let index = 0; index < len; index++) {
        if (state.get(index).get('category') === cat) {
            return state;
        }
    }
    const newState = state.push(fromJS({ category: cat, posts: [] }));
    localStorage.setItem('diarys', JSON.stringify(newState));
    return newState;
};

handlers[DEL_CAT] = (state, action) => {
    const { cat } = action;
    const len = state.size;
    for (let index = 0; index < len; index++) {
        if (state.get(index).get('category') === cat) {
            const newState = state.delete(index);
            localStorage.setItem('diarys', JSON.stringify(newState));
            return newState;
        }
    }
};

handlers[ADD_POST] = (state, action) => {
    const { cat, post } = action;
    const len = state.size;
    for (let index = 0; index < len; index++) {
        if (state.get(index).get('category') === cat) {
            const newState = state.update(index, x => x.update('posts', y => y.push(post)));
            localStorage.setItem('diarys', JSON.stringify(newState));
            return newState;
        }
    }
};

handlers[DEL_POST] = (state, action) => {
    const { cat, date } = action;
    const len = state.size;
    for (let index = 0; index < len; index++) {
        if (state.get(index).get('category') === cat) {
            const posts = state.get(index).get('posts');
            const le = posts.size;
            for (let i = 0; i < le; i++) {
                if (posts.get(i).get('date') === date) {
                    const newState = state.update(index, x => x.update('posts', y => y.delete(i)));
                    localStorage.setItem('diarys', JSON.stringify(newState));
                    return newState;
                }
            }
        }
    }
};


const diarys = createReducer(fromJS([]), handlers);

export default diarys;
