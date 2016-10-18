/*
日记摘要组件
*/


import React from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import hljs from 'highlight.js';
import trimHtml from 'trim-html';


export default class PostItem extends React.PureComponent {
    componentDidMount() {
        // 配置markdown解析器和highlight.js
        marked.setOptions({ highlight: code => hljs.highlightAuto(code).value });
    }


    render() {
        const { id, router } = this.props;
        // 生成标签项
        let tagItems = this.props.tag.map(tag => (<Link key={tag} to={`/tag/${tag}`}>{tag}</Link>));
        // 解析markdown文本为html
        const markup = marked(this.props.body.toString(), { sanitize: true });

        return (
            <article
              className={`article postItem ${this.props.asideShow ? 'article-asideShow' : 'article-asideHidden'}`}
            >
                <h3 className="article-title"
                  onClick={() => router.push(`/post/${id}`)}
                >{this.props.title}</h3>
                <button className="article-delete icon-deleteArticle" title="删除日记"
                  onClick={() => {
                      if (confirm('确定要删除此日记吗?')) {
                          this.props.delPost(this.props.id);
                      }
                  }}
                >
                </button>
                <div className="article-date">
                    <i className="icon-date"></i>
                    {this.props.date}
                </div>
                <section className="article-section"
                  dangerouslySetInnerHTML={{ __html: trimHtml(markup, { limit: 300 }).html }}
                >
                </section>
                <div className="article-bar">
                    <div className="article-tags">
                      {tagItems}
                    </div>
                    <div className="article-button">
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
                </div>
            </article>
        );
    }
}
