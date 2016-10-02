import { TOGGLE_FORM, ADD_CAT, DEL_CAT, ADD_POST, DEL_POST } from '../constants/actionTypes';


function makeActionCreator(type, ...argNames) {
    return (...args) => {
        const action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
    };
}

export const toggleForm = makeActionCreator(TOGGLE_FORM);
export const addCat = makeActionCreator(ADD_CAT, 'cat');
export const delCat = makeActionCreator(DEL_CAT, 'cat');
export const addPost = makeActionCreator(ADD_POST, 'cat', 'post');
export const delPost = makeActionCreator(DEL_POST, 'cat', 'date');
