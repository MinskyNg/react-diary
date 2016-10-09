import React from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import trimHtml from 'trim-html';


export default class PostItem extends React.PureComponent {
    render() {
        const { id, router } = this.props;
        let tagItems = this.props.tags.map(tag => <Link to={`/tag/${tag}`}>{tag}</Link>);
        const markup = marked(this.props.body.toString(), { sanitize: true });
        return (
            <article className="content-article">
                <h3 className="article-title">{this.props.title}</h3>
                <button className="article-delete" title="删除日记"
                  onClick={() => this.props.delPost(id)}
                >
                </button>
                <span className="article-date">{this.props.date}</span>
                <section className="article-section">
                    dangerouslySetInnerHTML={{ __html: trimHtml(markup, { limit: 300 }) }}
                </section>
                <div className="article-bar">
                    {tagItems}
                    <button
                      onClick={router.push(`/post/${id}`)}
                    >
                        查看全文
                    </button>
                    <button
                      onClick={router.push(`/editor/${id}`)}
                    >
                        编辑日记
                    </button>
                </div>
            </article>
        );
    }
}
