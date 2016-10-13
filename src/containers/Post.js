import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import marked from 'marked';
import hljs from 'highlight.js';
import { delPost, changeNavName } from '../actions';


class Post extends React.PureComponent {
    componentDidMount() {
        this.props.dispatch(changeNavName(this.props.posts[this.props.params.id].category));
        // 配置markdown解析器和highlight.js
        marked.setOptions({ highlight: code => hljs.highlightAuto(code).value });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            nextProps.dispatch(changeNavName(nextProps.posts[nextProps.params.id].category));
        }
    }

    render() {
        const { posts, dispatch, router } = this.props;
        const post = posts[this.props.params.id];
        if (post === undefined) {
            return <div></div>;
        }
        let tagItems = post.tag.map(tag => (<Link key={tag} to={`/tag/${tag}`}>{tag}</Link>));
        const markup = marked(post.body.toString(), { sanitize: true });
        return (
            <article className="article">
                <h3 className="article-title">{post.title}</h3>
                <div className="article-date">
                    <i className="icon-date"></i>
                    {`${post.year}-${post.date}`}
                </div>
                <section className="article-section"
                  dangerouslySetInnerHTML={{ __html: markup }}
                >
                </section>
                <div className="article-bar">
                    {tagItems}
                    <button
                      onClick={() => {
                          if (confirm('确定要删除此日记吗?')) {
                              dispatch(delPost(post.id));
                              router.replace('/');
                          }
                      }}
                    >
                        删除日记
                    </button>
                    <button
                      onClick={() => router.push(`/editor/${post.id}`)}
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

export default connect(selector)(Post);
