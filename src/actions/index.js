import { ADD_CAT, EDIT_CAT, DEL_CAT, ADD_POST, DEL_POST,
  CHANGE_TITLE, CHANGE_BODY, CHANGE_CAT, CHANGE_SCREEN } from '../constants/actionTypes';


function makeActionCreator(type, ...argNames) {
    return (...args) => {
        const action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
    };
}

export const addCat = makeActionCreator(ADD_CAT, 'cat');
export const editCat = makeActionCreator(EDIT_CAT, 'cat', 'newCat');
export const delCat = makeActionCreator(DEL_CAT, 'cat');
export const addPost = makeActionCreator(ADD_POST, 'date');
export const delPost = makeActionCreator(DEL_POST, 'id');
export const changeTitle = makeActionCreator(CHANGE_TITLE, 'id', 'title');
export const changeBody = makeActionCreator(CHANGE_BODY, 'id', 'body');
export const changeCat = makeActionCreator(CHANGE_CAT, 'id', 'cat');
export const changeScreen = makeActionCreator(CHANGE_SCREEN, 'show');

