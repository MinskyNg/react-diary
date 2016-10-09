import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { delPost, changeNavName } from '../actions';
import marked from 'marked';


class Post extends React.PureComponent {
    render() {
        const { posts, dispatch, router } = this.props;
        const post = posts[this.props.params.id];
        if (post === undefined) {
            return (<div></div>);
        }
        dispatch(changeNavName(post.category));
        let tagItems = post.tags.map(tag => <Link to={`/tag/${tag}`}>{tag}</Link>);
        const markup = marked(post.body.toString(), { sanitize: true });
        return (
            <article className="content-article">
                <h3 className="article-title">{post.title}</h3>
                <span className="article-date">{`${post.year}-${post.date}`}</span>
                <section className="article-section">
                    dangerouslySetInnerHTML={{ __html: markup }}
                </section>
                <div className="article-bar">
                    {tagItems}
                    <button
                      onClick={() => {
                          dispatch(delPost(post.id));
                          router.replace('/');
                      }}
                    >
                        删除日记
                    </button>
                    <button
                      onClick={router.push(`/editor/${post.id}`)}
                    >
                        编辑日记
                    </button>
                </div>
            </article>
        );
    }
}


Post.propTypes = {
    postIds: PropTypes.array.isRequired,
    posts: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
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

export default connect(selector)(Post);
