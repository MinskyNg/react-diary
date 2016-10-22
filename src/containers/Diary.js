/**
* 日记管理
**/


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addCat, delCat, addTag, delTag, addPost, toggleAside, toggleScreen } from '../actions';
import Nav from '../components/Nav';
import Aside from '../components/Aside';


class Home extends React.PureComponent {
    render() {
        const { postIds, categories, tags, navName, asideShow, dispatch, router } = this.props;

        return (
            <div className="diary-warpper">
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
                      dispatch(addPost(postIds[0] + 1, cat, year, date));
                      router.replace(`/editor/${postIds[0] + 1}`);
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
            </div>
        );
    }
}


Home.propTypes = {
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

export default connect(selector)(Home);
