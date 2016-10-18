/*
日记详情组件
*/


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import marked from 'marked';
import hljs from 'highlight.js';
import { delPost, changeNavName } from '../actions';


class Post extends React.PureComponent {
    componentDidMount() {
        if (this.props.posts[this.props.params.id] !== undefined) {
            this.props.dispatch(changeNavName(this.props.posts[this.props.params.id].category));
        }
        // 配置markdown解析器和highlight.js
        marked.setOptions({ highlight: code => hljs.highlightAuto(code).value });
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id && this.props.posts[this.props.params.id] !== undefined) {
            nextProps.dispatch(changeNavName(nextProps.posts[nextProps.params.id].category));
        }
    }


    render() {
        const { posts, asideShow, dispatch, router } = this.props;
        const post = posts[this.props.params.id];

        if (post === undefined) {
            return (
                <div className="notfound">
                    <h2>404</h2>
                    <p>Post not found</p>
                    <button onClick={() => router.replace('/')}>Back To Home</button>
                </div>
            );
        }

        // 生成标签项
        let tagItems = post.tag.map(tag => (<Link key={tag} to={`/tag/${tag}`}>{tag}</Link>));
        // 解析markdown文本为html
        const markup = marked(post.body.toString(), { sanitize: true });

        return (
            <article
              className={`article ${this.props.asideShow ? 'article-asideShow' : 'article-asideHidden'}`}
            >
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
                    <div className="article-tags">
                      {tagItems}
                    </div>
                    <div className="article-button">
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
    })).isRequired,
    asideShow: PropTypes.bool.isRequired
};


function selector(state) {
    return {
        postIds: state.getIn(['diarys', 'postIds']).toJS(),
        posts: state.getIn(['diarys', 'posts']).toJS(),
        asideShow: state.get('asideShow')
    };
}

export default connect(selector)(Post);
