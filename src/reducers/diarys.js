import { ADD_CAT, DEL_CAT, ADD_POST, DEL_POST } from '../constants/actionTypes';


function add_cat(state, cat) {
    const len = state.length;
    for (let index = 0; index < len; index++) {
        if (state[index].category === cat) {
            return state;
        }
    }
    const newState = [...state, { category: cat, posts: [] }];
    localStorage.setItem('diarys', JSON.stringify(newState));
    return newState;
}

function del_cat(state, cat) {
    const len = state.length;
    for (let index = 0; index < len; index++) {
        if (state[index].category === cat) {
            const newState = [...state.slice(0, index), ...state.slice(index + 1)];
            localStorage.setItem('diarys', JSON.stringify(newState));
            return newState;
        }
    }
}

function add_post(state, cat, post) {
    const len = state.length;
    for (let index = 0; index < len; index++) {
        if (state[index].category === cat) {
            const newState = [...state.slice(0, index), Object.assign({},
                state[index], { posts: [...state[index].posts, post] }),
                ...state.slice(index + 1)];
            localStorage.setItem('diarys', JSON.stringify(newState));
            return newState;
        }
    }
}

function del_post(state, cat, date) {
    const len = state.length;
    for (let index = 0; index < len; index++) {
        if (state[index].category === cat) {
            const posts = state[index].posts;
            const le = posts.length;
            for (let i = 0; i < le; i++) {
                if (posts[i].date === date) {
                    const newState = [...state.slice(0, index), Object.assign({},
                        state[index], { posts: [...posts.slice(0, i), ...posts.slice(i + 1)] }),
                        ...state.slice(index + 1)];
                    localStorage.setItem('diarys', JSON.stringify(newState));
                    return newState;
                }
            }
        }
    }
}

export default function diarys(state = [], action) {
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
