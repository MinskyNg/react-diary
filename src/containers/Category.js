/**
* 分类页面
**/


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { delPost, changeNavName } from '../actions';
import ArchiveItem from '../components/ArchiveItem';


class Category extends React.PureComponent {
    componentDidMount() {
        this.props.dispatch(changeNavName(this.props.params.catName));
    }


    componentWillReceiveProps(nextProps) {
        // 当前分类改变时，修改导航栏标题
        if (this.props.params.catName !== nextProps.params.catName) {
            nextProps.dispatch(changeNavName(nextProps.params.catName));
        }
    }


    render() {
        const catName = this.props.params.catName;
        const { categories, posts, asideShow, dispatch, router } = this.props;
        const catIds = categories[catName];

        if (catIds === undefined) {
            return (
                <div className="notfound">
                    <h2>404</h2>
                    <p>Category not found</p>
                    <button onClick={() => router.replace('/')}>Back To Home</button>
                </div>
            );
        }

        let ArchiveItems = [];
        let i = 0;
        const len = catIds.length;
        // 匹配日记按年份输出
        while (i < len) {
            let prevPost = posts[catIds[i]];
            let nextPost = posts[catIds[++i]];
            let articles = [prevPost];
            while (nextPost && prevPost.year === nextPost.year) {
                prevPost = nextPost;
                nextPost = posts[catIds[++i]];
                articles.push(prevPost);
            }
            ArchiveItems.push(
                <ArchiveItem
                  key={prevPost.year}
                  year={prevPost.year}
                  articles={articles}
                  asideShow={asideShow}
                  delPost={id => dispatch(delPost(id))}
                  router={router}
                />
            );
        }

        return (
            <div>
                {ArchiveItems}
            </div>
        );
    }
}


Category.propTypes = {
    categories: PropTypes.object.isRequired,
    posts: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        tag: PropTypes.array.isRequired
    })).isRequired,
    asideShow: PropTypes.bool.isRequired
};


function selector(state) {
    return {
        categories: state.getIn(['diarys', 'categories']).toJS(),
        posts: state.getIn(['diarys', 'posts']).toJS(),
        asideShow: state.get('asideShow')
    };
}

export default connect(selector)(Category);
