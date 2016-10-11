import { ADD_CAT, DEL_CAT, ADD_TAG, DEL_TAG, ADD_POST, DEL_POST, UPDATE_TITLE, UPDATE_BODY,
 UPDATE_CAT, UPDATE_TAG } from '../constants/actionTypes';
import { fromJS, List } from 'immutable';


function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            const newState = handlers[action.type](state, action);
            localStorage.setItem('diarys', JSON.stringify(newState));
            return newState;
        }
        return state;
    };
}

const handlers = {};


// 添加分类
handlers[ADD_CAT] = (state, action) => {
    if (action.cat === '全部日记' || action.cat === '搜索结果') {
        return state;
    }
    const cat = action.cat;
    return state.hasIn(['categories', cat]) ? state : state.setIn(['categories', cat], List([]));
};


// 删除分类
handlers[DEL_CAT] = (state, action) => {
    if (action.cat === '未分类') {
        return state;
    }
    const cat = action.cat;
    const catList = state.getIn(['categories', cat]);
    let newState = state;
    catList.forEach(id => {
        newState = newState.setIn(['posts', id.toString(), 'category'], '未分类')
          .updateIn(['categories', '未分类'], x => {
              const index = x.findKey(y => y < id);
              if (index === undefined) {
                  return x.push(id);
              }
              return x.insert(index, id);
          });
    });
    return newState.deleteIn(['categories', cat]);
};


// 添加标签
handlers[ADD_TAG] = (state, action) => {
    const tag = action.tag;
    return state.hasIn(['tags', tag]) ? state : state.setIn(['tags', tag], List([]));
};

// 删除标签
handlers[DEL_TAG] = (state, action) => {
    const tag = action.tag;
    const tagList = state.getIn(['tags', tag]);
    let newState = state;
    tagList.forEach(id => {
        newState = newState.updateIn(['posts', id.toString(), 'tag'], x => x.delete(x.indexOf(tag)));
    });
    return newState.deleteIn(['tags', tag]);
};


// 添加日记
handlers[ADD_POST] = (state, action) => {
    const { id, year, date, cat } = action;
    if (state.hasIn(['categories', cat])) {
        return state.update('postIds', x => x.unshift(id))
          .updateIn(['categories', cat], x => x.unshift(id))
          .setIn(['posts', id.toString()], fromJS({ id, title: '新建日记', body: '', year, date, category: cat, tag: [] }));
    }
    return state.update('postIds', x => x.unshift(id))
      .updateIn(['categories', '未分类'], x => x.unshift(id))
      .setIn(['posts', id.toString()], fromJS({ id, title: '新建日记', body: '', year, date, category: '未分类', tag: [] }));
};


// 删除日记
handlers[DEL_POST] = (state, action) => {
    const id = action.id;
    const post = state.getIn(['posts', id.toString()]).toJS();
    let newState = state.update('postIds', x => x.delete(x.indexOf(id)))
      .updateIn(['categories', post.category], x => x.delete(x.indexOf(id)));
    post.tag.forEach(tag => {
        newState = newState.updateIn(['tags', tag], x => x.delete(x.indexOf(id)));
    });
    return newState.deleteIn(['posts', id.toString()]);
};


// 修改标题
handlers[UPDATE_TITLE] = (state, action) => {
    return state.setIn(['posts', action.id.toString(), 'title'], action.title);
};


// 修改内容
handlers[UPDATE_BODY] = (state, action) => {
    return state.setIn(['posts', action.id.toString(), 'body'], action.body);
};


// 修改分类
handlers[UPDATE_CAT] = (state, action) => {
    const { id, cat } = action;
    const preCat = state.getIn(['posts', id.toString(), 'category']);
    return state.updateIn(['categories', preCat], x => x.delete(x.indexOf(id)))
      .updateIn(['categories', cat], x => {
          const index = x.findKey(y => y < id);
          if (index === undefined) {
              return x.push(id);
          }
          return x.insert(index, id);
      })
      .setIn(['posts', id.toString(), 'category'], cat);
};


// 修改标签
handlers[UPDATE_TAG] = (state, action) => {
    if (action.tag.length > 5) {
        return state;
    }
    const id = action.id;
    const preTag = state.getIn(['posts', id.toString(), 'tag']);
    let newState = state.setIn(['posts', id.toString(), 'tag'], List(action.tag));
    preTag.forEach(tag => {
        newState = newState.updateIn(['tags', tag], x => x.delete(x.indexOf(id)));
    });
    action.tag.forEach(tag => {
        newState = newState.updateIn(['tags', tag], x => {
            const index = x.findKey(y => y < id);
            if (index === undefined) {
                return x.push(id);
            }
            return x.insert(index, id);
        });
    });
    return newState;
};


export default createReducer(fromJS({
    postIds: [],
    categories: {},
    tags: {},
    posts: {}
}), handlers);
