import { ADD_CAT, DEL_CAT, ADD_POST, DEL_POST } from '../constants/actionTypes';
import { fromJS } from 'immutable';


function add_cat(state, cat) {
    const len = state.size;
    for (let index = 0; index < len; index++) {
        if (state.get(index).get('category') === cat) {
            return state;
        }
    }
    const newState = state.push(fromJS({ category: cat, posts: [] }));
    localStorage.setItem('diarys', JSON.stringify(newState));
    return newState;
}

function del_cat(state, cat) {
    const len = state.size;
    for (let index = 0; index < len; index++) {
        if (state.get(index).get('category') === cat) {
            const newState = state.delete(index);
            localStorage.setItem('diarys', JSON.stringify(newState));
            return newState;
        }
    }
}

function add_post(state, cat, post) {
    const len = state.size;
    for (let index = 0; index < len; index++) {
        if (state.get(index).get('category') === cat) {
            const newState = state.update(index, x => x.update('posts', y => y.push(post)));
            localStorage.setItem('diarys', JSON.stringify(newState));
            return newState;
        }
    }
}

function del_post(state, cat, date) {
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
}

export default function diarys(state = fromJS([]), action) {
    switch (action.type) {
        case ADD_CAT:
            return add_cat(state, action.cat);
        case DEL_CAT:
            return del_cat(state, action.cat);
        case ADD_POST:
            return add_post(state, action.cat, action.post);
        case DEL_POST:
            return del_post(state, action.cat, action.date);
        default:
            return state;
    }
}
