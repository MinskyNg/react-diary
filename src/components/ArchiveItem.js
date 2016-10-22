/**
* 日记归档
**/


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
