/**
 * 日记归档
 * @class ArchiveItem
 * @prop {array} articles 文章列表
 * @prop {function} delPost 删除文章
 * @prop {function} asideShow 查看全文
 * @prop {string} year 归档年份
 */


import React from 'react';
import PostItem from './PostItem';


export default class ArchiveItem extends React.PureComponent {
    render() {
        const { articles, delPost, asideShow } = this.props;

        let postItems = articles.map(post => (
                <PostItem
                  key={post.id}
                  {...post}
                  asideShow={asideShow}
                  delPost={delPost}
                />
            )
        );

        return (
            <div>
                <div className="year">{`${this.props.year}年`}</div>
                {postItems}
            </div>
        );
    }
}
