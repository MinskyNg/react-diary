import { ADD_CAT, DEL_CAT, ADD_TAG, DEL_TAG, ADD_POST, DEL_POST, UPDATE_TITLE, UPDATE_BODY,
 UPDATE_CAT, UPDATE_TAG, CHANGE_NAV_NAME, TOGGLE_ASIDE } from '../constants/actionTypes';


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
export const delCat = makeActionCreator(DEL_CAT, 'cat');
export const addTag = makeActionCreator(ADD_TAG, 'tag');
export const delTag = makeActionCreator(DEL_TAG, 'tag');
export const addPost = makeActionCreator(ADD_POST, 'id', 'cat', 'year', 'date');
export const delPost = makeActionCreator(DEL_POST, 'id');
export const updateTitle = makeActionCreator(UPDATE_TITLE, 'id', 'title');
export const updateBody = makeActionCreator(UPDATE_BODY, 'id', 'body');
export const updateCat = makeActionCreator(UPDATE_CAT, 'id', 'cat');
export const updateTag = makeActionCreator(UPDATE_TAG, 'id', 'tag');
export const changeNavName = makeActionCreator(CHANGE_NAV_NAME, 'navName');
export const toggleAside = makeActionCreator(TOGGLE_ASIDE);
