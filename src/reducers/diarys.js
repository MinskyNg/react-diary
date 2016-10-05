import { ADD_CAT, EDIT_CAT, DEL_CAT, ADD_POST, DEL_POST,
  CHANGE_TITLE, CHANGE_BODY, CHANGE_CAT } from '../constants/actionTypes';
import { fromJS, Map, List } from 'immutable';


function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            const newState = handlers[action.type](state, action);
            localStorage.setItem('diarys', JSON.stringify(newState));
            return newState;
        } else {
            return state;
        }
    };
}

const handlers = {};

// 添加分类
handlers[ADD_CAT] = (state, action) => {
    const cat = action.cat;
    if (state.hasIn(['categories', cat])) {
        return state;
    } else {
        return state.setIn(['categories', cat], List([]));
    }
};

// 更改分类
handlers[EDIT_CAT] = (state, action) => {
    const { cat, newCat } = action;
    const catList = state.getIn(['categories', cat]);
    let newState = state.deleteIn(['categories', cat])
      .setIn(['categories', newCat], catList);
    catList.forEach(id => {
        newState = newState.setIn(['posts', id, 'category'], newCat);
    });
    return newState;
};

// 删除分类
handlers[DEL_CAT] = (state, action) => {
    const cat = action.cat;
    const catList = state.getIn(['categories', cat]);
    let newState = state.deleteIn(['categories', cat]);
    catList.forEach(id => {
        newState = newState.setIn(['posts', id, 'category'], '未分类')
          .updateIn(['categories', '未分类'], cate => cate.push(id));
    });
    return newState;
};

// 添加文章
handlers[ADD_POST] = (state, action) => {
    const date = action.date;
    const id = state.getIn(['postIds', 0]) + 1;
    return state.update('postIds', ids => ids.unshift(id))
      .updateIn(['archives', date.substr(0, 4)], List([id]), arch => arch.unshift(id))
      .updateIn(['categories', '未分类'], cate => cate.unshift(id))
      .setIn(['posts', id], Map({ id, title: '新建文章', body: '', date, category: '未分类' }));
};

// 删除文章
handlers[DEL_POST] = (state, action) => {
    const id = action.id;
    const post = state.getIn(['posts', id]).toJS();
    return state.update('postIds', ids => ids.delete(ids.indexOf(id)))
      .updateIn(['archives', post.date.substr(0, 4)], arch => arch.delete(arch.indexOf(id)))
      .updateIn(['categories', post.category], cate => cate.delete(cate.indexOf(id)))
      .deleteIn(['posts', id]);
};

// 修改标题
handlers[CHANGE_TITLE] = (state, action) => {
    return state.updateIn(['posts', action.id, 'title'], action.title);
};

// 修改内容
handlers[CHANGE_BODY] = (state, action) => {
    return state.updateIn(['posts', action.id, 'body'], action.body);
};

// 修改分类
handlers[CHANGE_CAT] = (state, action) => {
    const { id, cat } = action;
    const preCat = state.getIn(['posts', id, 'category']);
    return state.updateIn(['categories', preCat], cate => cate.delete(cate.indexOf(id)))
      .updateIn(['categories', cat], cate => cate.unshift(id))
      .updateIn(['posts', id, 'category'], cat);
};


export default createReducer(fromJS({
    postIds: [],
    archives: {},
    categories: { 未分类: [] },
    posts: {}
}), handlers);
