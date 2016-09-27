import React from 'react';
import marked from 'marked';


export default class DiaryItem extends React.PureComponent {
    componentDidMount() {
        this._delete.style.visibility = 'hidden';
    }

    rawMarkup() {
        const rawMarkup = marked(this.props.body.toString(), { sanitize: true });
        return { __html: rawMarkup };
    }

    handleMouseOver() {
        this._delete.style.visibility = 'visible';
    }

    handleMouseOut() {
        this._delete.style.visibility = 'hidden';
    }

    handleClick() {
        if (confirm('确定要删除此文章吗?')) {
            this.props.delPost(this.props.category, this.props.date);
        }
    }

    render() {
        return (
                <article
                  className="diary-item"
                  onMouseOver={ () => this.handleMouseOver() }
                  onMouseOut={ () => this.handleMouseOut() }
                >
                    <h3 className="diary-title">{ this.props.title }</h3>
                    <input
                      type="button" value="删除文章"
                      ref={ input => this._delete = input }
                      onClick={ () => this.handleClick() }
                    />
                    <span className="diary-date">{ this.props.date }</span>
                    <div
                      className="diary-body"
                      dangerouslySetInnerHTML={ this.rawMarkup() }
                    >
                    </div>
                </article>
        );
    }
}
