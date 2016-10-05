import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PostItem from '../components/PostItem';


class Home extends React.PureComponent {
    render() {
        const { postIds, posts } = this.props;
        let postItems = postIds.slice(0, 6).map((postId) => {
            const post = posts[postId];
            return (
                <PostItem
                  key={postId}
                  {...post}
                />
            );
        });
        return (
            <div className="main home">
                { postItems }
            </div>
        );
    }
}


Home.propTypes = {
    postIds: PropTypes.arrayOf(
        PropTypes.number
    ).isRequired,
    posts: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired
    }).isRequired
};


function selector(state) {
    return {
        postIds: state.getIn(['diarys', 'postIds']).toJS(),
        posts: state.getIn(['diarys', 'posts']).toJS()
    };
}

export default connect(selector)(Home);
