import React from 'react';
import PostItem from './PostItem';


export default class ArchiveItem extends React.PureComponent {
    render() {
        const { articles, delPost, router } = this.props;
        let postItems = articles.map(post => (
                <PostItem
                  key={post.id}
                  {...post}
                  delPost={delPost}
                  router={router}
                />
            )
        );
        return (
            <div>
                <div className="content-year">{`${this.props.year}年`}</div>
                {postItems}
            </div>
        );
    }
}
