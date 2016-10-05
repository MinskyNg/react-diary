import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import EditorNav from '../components/EditorNav';
import EditorMain from '../components/EditorMain';


class Editor extends React.PureComponent {
    render() {
        const post = this.props.posts[this.props.params.id];
        return (
            <div className="editor">
                <EditorNav
                  id={post.id}
                  title={post.title}
                  category={post.category}
                />
                <EditorMain
                  id={post.id}
                  body={post.body}
                />
            </div>
        );
    }
}

Editor.propTypes = {
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

export default connect(selector)(Editor);
