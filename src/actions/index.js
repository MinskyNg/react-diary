import { ADD_CAT, DEL_CAT, ADD_TAG, DEL_TAG, ADD_POST, DEL_POST, UPDATE_TITLE, UPDATE_BODY,
  UPDATE_CAT, UPDATE_TAG, CHANGE_NAV_NAME, TOGGLE_ASIDE, TOGGLE_SCREEN }
  from '../constants/actionTypes';


/**
* actionCreator生成辅助函数
**/
function makeActionCreator(type, ...argNames) {
    return (...args) => {
        const action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
    };
}


export const addCat = makeActionCreator(ADD_CAT, 'cat');  // 添加分类
export const delCat = makeActionCreator(DEL_CAT, 'cat');  // 删除分类
export const addTag = makeActionCreator(ADD_TAG, 'tag');  // 添加标签
export const delTag = makeActionCreator(DEL_TAG, 'tag');  // 删除标签
export const addPost = makeActionCreator(ADD_POST, 'id', 'cat', 'year', 'date');  // 添加日记
export const delPost = makeActionCreator(DEL_POST, 'id');  // 删除日记
export const updateTitle = makeActionCreator(UPDATE_TITLE, 'id', 'title');  // 修改标题
export const updateBody = makeActionCreator(UPDATE_BODY, 'id', 'body');  // 修改内容
export const updateCat = makeActionCreator(UPDATE_CAT, 'id', 'cat');  // 修改分类
export const updateTag = makeActionCreator(UPDATE_TAG, 'id', 'tag');  // 修改标签
export const changeNavName = makeActionCreator(CHANGE_NAV_NAME, 'navName');  // 改变导航栏标题
export const toggleAside = makeActionCreator(TOGGLE_ASIDE);  // 切换侧边栏
export const toggleScreen = makeActionCreator(TOGGLE_SCREEN);  // 切换全屏
