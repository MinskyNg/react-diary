import React from 'react';
import marked from 'marked';


class DiaryItem extends React.Component {
    rawMarkup() {
        let rawMarkup = marked(this.props.body.toString(), { sanitize: true });
        return { __html: rawMarkup };
    }

    handleMouseOver() {
        this.refs.delete.style.visibility = 'visible';
    }

    handleMouseOut() {
        this.refs.delete.style.visibility = 'hidden';
    }

    handleClick() {
        if (confirm('确定要删除此文章吗?')) {
            this.props.deleteDiary(this.props.category, this.props.date);
        }
    }

    render() {
        return (
                <article className="diary-item" onMouseOver={ this.handleMouseOver.bind(this) } onMouseOut={ this.handleMouseOut.bind(this) }>
                    <h3 className="diary-title">{ this.props.title }</h3>
                    <input ref="delete" type="button" value="删除文章" onClick={ this.handleClick.bind(this) } />
                    <span className="diary-date">{ this.props.date }</span>
                    <div className="diary-body" dangerouslySetInnerHTML={ this.rawMarkup() }></div>
                </article>
        );
    }
}

export default DiaryItem;
