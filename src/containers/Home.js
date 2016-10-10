import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { delPost, changeNavName } from '../actions';
import ArchiveItem from '../components/ArchiveItem';


class Home extends React.PureComponent {
    componentDidMount() {
        this.props.dispatch(changeNavName('全部日记'));
    }

    render() {
        const { postIds, posts, dispatch, router } = this.props;
        let ArchiveItems = [];
        let i = 0;
        const len = postIds.length;
        while (i < len) {
            let prevPost = posts[postIds[i]];
            let nextPost = posts[postIds[++i]];
            let articles = [prevPost];
            while (nextPost && prevPost.year === nextPost.year) {
                prevPost = nextPost;
                nextPost = posts[postIds[++i]];
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


Home.propTypes = {
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
        posts: state.getIn(['diarys', 'posts']).toJS(),
    };
}

export default connect(selector)(Home);