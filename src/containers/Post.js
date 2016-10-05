import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';


class Post extends React.PureComponent {
    render() {
        const post = this.props.posts[this.props.params.id];
        return (
            <div className="main post">
                <h1>{post.title}</h1>
                <h2>{post.date}</h2>
                <h2>{post.category}</h2>
                <div>{post.body}</div>
            </div>
        );
    }
}


Post.propTypes = {
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
        posts: state.getIn(['diarys', 'posts']).toJS()
    };
}

export default connect(selector)(Post);
