import React from 'react';
import marked from 'marked';
import trimHtml from 'trim-html';


export default class PostItem extends React.PureComponent {
    render() {
        return (
            <div className="postItem">
                <h1>{this.props.title}</h1>
                <h2>{this.props.date}</h2>
                <h2>{this.props.category}</h2>
                <div>{this.props.body}</div>
            </div>
        );
    }
}
