/**
 * 日记归档
 * @function ArchiveItem
 * @prop {array} articles 文章列表
 * @prop {function} delPost 删除文章
 * @prop {function} asideShow 查看全文
 * @prop {string} year 归档年份
 */


import React from 'react';
import PostItem from './PostItem';


export default function ArchiveItem({ articles, delPost, asideShow, year }) {
    const postMap = post => (
        <PostItem
          key={post.id}
          {...post}
          asideShow={asideShow}
          delPost={delPost}
        />
    );

    return (
        <div>
            <div className="year">{`${year}年`}</div>
            {articles.map(postMap)}
        </div>
    );
}
