import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { delPost, changeNavName } from '../actions';
import ArchiveItem from '../components/ArchiveItem';


class Search extends React.PureComponent {
    render() {
        const keyword = this.props.params.keyword;
        const { postIds, posts, dispatch, router } = this.props;
        dispatch(changeNavName('搜索结果'));
        let ArchiveItems = [];
        const searchPosts = [];
        for (let i = 0, len = postIds.length; i < len; i++) {
            if (posts[postIds[i]].title.indexOf(keyword) !== -1) {
                searchPosts.push(posts[postIds[i]]);
            }
        }
        for (let i = 0, len = searchPosts.length; i < len; i++) {
            let prevPost = posts[searchPosts[i]];
            let articles = [prevPost];
            while (prevPost.year === posts[searchPosts[i + 1]].year) {
                prevPost = posts[searchPosts[i + 1]];
                articles.push(prevPost);
                i++;
            }
            ArchiveItems.push(
                <ArchiveItem
                  key={prevPost.year}
                  year={prevPost.year}
                  articles={articles}
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


Search.propTypes = {
    postIds: PropTypes.array.isRequired,
    posts: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        tag: PropTypes.array.isRequired
    }).isRequired
};


function selector(state) {
    return {
        postIds: state.getIn(['diarys', 'postIds']).toJS(),
        posts: state.getIn(['diarys', 'posts']).toJS()
    };
}

export default connect(selector)(Search);
