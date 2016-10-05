import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PostItem from '../components/PostItem';


class Category extends React.PureComponent {
    render() {
        const { categories, posts, params } = this.props;
        let postItems = categories[params.id].map((postId) => {
            const post = posts[postId];
            return (
                <PostItem
                  key={postId}
                  {...post}
                />
            );
        });
        return (
            <div className="main category">
                <h1>params.id</h1>
                { postItems }
            </div>
        );
    }
}


Category.propTypes = {
    categories: PropTypes.object.isRequired,
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
        categories: state.getIn(['diarys', 'categories']).toJS(),
        posts: state.getIn(['diarys', 'posts']).toJS()
    };
}

export default connect(selector)(Category);
