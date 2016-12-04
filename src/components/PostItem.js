/**
 * 日记摘要
 * @class PostItem
 * @prop {string} id 文章id
 * @prop {string} title 文章标题
 * @prop {string} body 文章内容
 * @prop {string} category 文章分类
 * @prop {array} tag 文标签
 * @prop {boolean} asideShow 是否显示侧边栏
 * @prop {function} delPost 删除文章
 */


import React from 'react';
import { Link, browserHistory } from 'react-router';
import marked from 'marked';
import hljs from 'highlight.js';
import trimHtml from 'trim-html';


export default class PostItem extends React.PureComponent {
    componentDidMount() {
        // 配置markdown解析器和highlight.js
        marked.setOptions({ highlight: code => hljs.highlightAuto(code).value });
    }


    render() {
        const id = this.props.id;
        // 生成标签项
        let tagItems = this.props.tag.map(tag => (<Link key={tag} to={`/tag/${tag}`}>{tag}</Link>));
        // 解析markdown文本为html
        const markup = marked(this.props.body.toString(), { sanitize: true });

        return (
            <article
              className={`article postItem ${this.props.asideShow ? 'article-asideShow' : 'article-asideHidden'}`}
            >
                <h3 className="article-title"
                  onClick={() => browserHistory.push(`/post/${id}`)}
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
                    {this.props.date} • {this.props.category}
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
                        onClick={() => browserHistory.push(`/post/${id}`)}
                      >
                          查看全文
                      </button>
                      <button
                        onClick={() => browserHistory.push(`/editor/${id}`)}
                      >
                          编辑日记
                      </button>
                    </div>
                </div>
            </article>
        );
    }
}
