/**
 * 日记摘要
 * @function PostItem
 * @prop {string} id 文章id
 * @prop {string} title 文章标题
 * @prop {string} body 文章内容
 * @prop {string} date 文章日期
 * @prop {string} category 文章分类
 * @prop {array} tag 文章标签
 * @prop {boolean} asideShow 是否显示侧边栏
 * @prop {function} delPost 删除文章
 */


import React from 'react';
import { Link, browserHistory } from 'react-router';
import marked from 'marked';
import trimHtml from 'trim-html';


export default function PostItem({ id, title, body, date, category, tag, asideShow, delPost }) {
    // 生成标签项
    const tagMap = t => (<Link key={t} to={`/t/${t}`}>{t}</Link>);
    // 解析markdown文本为html
    const markup = marked(body.toString(), { sanitize: true });

    return (
        <article
          className={`article postItem ${asideShow ? 'article-asideShow' : 'article-asideHidden'}`}
        >
            <h3 className="article-title"
              onClick={() => browserHistory.push(`/post/${id}`)}
            >{title}</h3>
            <button className="article-delete icon-deleteArticle" title="删除日记"
              onClick={() => {
                  if (confirm('确定要删除此日记吗?')) {
                      delPost(id);
                  }
              }}
            >
            </button>
            <div className="article-date">
                <i className="icon-date"></i>
                {date} • {category}
            </div>
            <section className="article-section"
              dangerouslySetInnerHTML={{ __html: trimHtml(markup, { limit: 300 }).html }}
            >
            </section>
            <div className="article-bar">
                <div className="article-tags">
                  {tag.map(tagMap)}
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
