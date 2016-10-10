import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { delPost, changeNavName } from '../actions';
import ArchiveItem from '../components/ArchiveItem';


class Search extends React.PureComponent {
    componentDidMount() {
        this.props.dispatch(changeNavName(`${this.props.params.keyword}的搜索结果`));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.keyword !== nextProps.params.keyword) {
            nextProps.dispatch(changeNavName(`${nextProps.params.keyword}的搜索结果`));
        }
    }

    render() {
        const keyword = this.props.params.keyword;
        const { postIds, posts, dispatch, router } = this.props;
        let ArchiveItems = [];
        const matchIds = [];
        postIds.forEach(id => {
            if (posts[id].title.indexOf(keyword) !== -1) {
                matchIds.push(id);
            }
        });
        let i = 0;
        const len = matchIds.length;
        while (i < len) {
            let prevPost = posts[matchIds[i]];
            let nextPost = posts[matchIds[++i]];
            let articles = [prevPost];
            while (nextPost && prevPost.year === nextPost.year) {
                prevPost = nextPost;
                nextPost = posts[matchIds[++i]];
                articles.push(prevPost);
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
    posts: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        tag: PropTypes.array.isRequired
    })).isRequired
};


function selector(state) {
    return {
        postIds: state.getIn(['diarys', 'postIds']).toJS(),
        posts: state.getIn(['diarys', 'posts']).toJS()
    };
}

export default connect(selector)(Search);