/**
 * 日记管理
 * @class Diary
 * @prop {array} postIds 文章id列表
 * @prop {object} categories 分类列表
 * @prop {array} tags 标签列表
 * @prop {stirng} navName 导航栏标题
 * @prop {boolean} asideShow 是否显示侧边栏
 */


import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { addCat, delCat, addTag, delTag, addPost, toggleAside, toggleScreen } from '../actions';
import Nav from '../components/Nav';
import Aside from '../components/Aside';
import BackTop from '../components/BackTop';


class Diary extends React.PureComponent {
    render() {
        const { postIds, categories, tags, navName, asideShow, dispatch } = this.props;

        return (
            <div className="diary-wrapper" id="diary">
                <Nav
                  navName={navName}
                  categories={categories}
                  tags={tags}
                  asideShow={asideShow}
                  addCat={cat => dispatch(addCat(cat))}
                  delCat={cat => dispatch(delCat(cat))}
                  addTag={tag => dispatch(addTag(tag))}
                  delTag={tag => dispatch(delTag(tag))}
                  addPost={(cat, year, date) => {
                      dispatch(addPost((postIds[0] + 1) || 0, cat, year, date));
                      browserHistory.replace(`/editor/${(postIds[0] + 1) || 0}`);
                  }}
                  toggleAside={() => dispatch(toggleAside())}
                  toggleScreen={() => dispatch(toggleScreen())}
                />
                {this.props.children}
                <Aside
                  postLen={postIds.length}
                  categories={categories}
                  asideShow={asideShow}
                />
                <BackTop />
            </div>
        );
    }
}


Diary.propTypes = {
    postIds: PropTypes.array.isRequired,
    categories: PropTypes.object.isRequired,
    tags: PropTypes.object.isRequired,
    navName: PropTypes.string.isRequired,
    asideShow: PropTypes.bool.isRequired
};


function selector(state) {
    return {
        postIds: state.getIn(['diarys', 'postIds']).toJS(),
        categories: state.getIn(['diarys', 'categories']).toJS(),
        tags: state.getIn(['diarys', 'tags']).toJS(),
        navName: state.get('navName'),
        asideShow: state.get('asideShow')
    };
}

export default connect(selector)(Diary);
