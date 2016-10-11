import React from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import trimHtml from 'trim-html';


export default class PostItem extends React.PureComponent {
    handleDelPost() {
        if (confirm('确定要删除此日记吗?')) {
            this.props.delPost(this.props.id);
        }
    }

    render() {
        const { id, router } = this.props;
        let tagItems = this.props.tag.map(tag => (<Link key={tag} to={`/tag/${tag}`}>{tag}</Link>));
        const markup = marked(this.props.body.toString(), { sanitize: true });
        return (
            <article className="article">
                <h3 className="article-title">{this.props.title}</h3>
                <button className="article-delete icon-deleteArticle" title="删除日记"
                  onClick={() => this.handleDelPost()}
                >
                </button>
                <div className="article-date">
                    <i className="icon-date"></i>
                    {this.props.date}
                </div>
                <section className="article-section"
                  dangerouslySetInnerHTML={{ __html: trimHtml(markup, { limit: 200 }).html }}
                >
                </section>
                <div className="article-bar">
                    {tagItems}
                    <button
                      onClick={() => router.push(`/post/${id}`)}
                    >
                        查看全文
                    </button>
                    <button
                      onClick={() => router.push(`/editor/${id}`)}
                    >
                        编辑日记
                    </button>
                </div>
            </article>
        );
    }
}
