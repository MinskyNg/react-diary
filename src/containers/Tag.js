import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { delPost, changeNavName } from '../actions';
import ArchiveItem from '../components/ArchiveItem';


class Tag extends React.PureComponent {
    componentDidMount() {
        this.props.dispatch(changeNavName(this.props.params.tagName));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.tagName !== nextProps.params.tagName) {
            nextProps.dispatch(changeNavName(nextProps.params.tagName));
        }
    }

    render() {
        const tagName = this.props.params.tagName;
        const { tags, posts, dispatch, router } = this.props;
        const postIds = tags[tagName];
        if (postIds === undefined) {
            return <div></div>;
        }
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


Tag.propTypes = {
    tags: PropTypes.object.isRequired,
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
        tags: state.getIn(['diarys', 'tags']).toJS(),
        posts: state.getIn(['diarys', 'posts']).toJS()
    };
}

export default connect(selector)(Tag);
