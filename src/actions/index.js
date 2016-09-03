import { TOGGLE_FORM, ADD_CAT, DEL_CAT, ADD_POST, DEL_POST } from '../constants/actionTypes';


export function toggleForm() {
    return {
        type: TOGGLE_FORM,
    };
}

export function addCat(cat) {
    return {
        type: ADD_CAT,
        cat
    };
}

export function delCat(cat) {
    return {
        type: DEL_CAT,
        cat
    };
}

export function addPost(cat, post) {
    return {
        type: ADD_POST,
        cat,
        post
    };
}

export function delPost(cat, date) {
    return {
        type: DEL_POST,
        cat,
        date
    };
}
