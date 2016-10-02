import React from 'react';
import DiaryItem from './DiaryItem.js';


export default class DiaryList extends React.PureComponent {
    componentDidMount() {
        this._delete.style.visibility = 'hidden';
    }

    handleMouseOver() {
        this._delete.style.visibility = 'visible';
    }

    handleMouseOut() {
        this._delete.style.visibility = 'hidden';
    }

    handleClick() {
        if (confirm('确定要删除此分类吗?')) {
            this.props.delCat(this.props.category);
        }
    }

    render() {
        let diarysItems = this.props.posts.map((diary, index) => {
            return (
                <DiaryItem
                  key={ diary.date }
                  {...diary}
                  category={ this.props.category }
                  delPost={ this.props.delPost }
                />
            );
        });

        return (
            <div
              className="diary-list"
              onMouseOver={ () => this.handleMouseOver() }
              onMouseOut={ () => this.handleMouseOut() }
            >
                <h2 className="category">
                  { this.props.category } ( { this.props.posts.length } )
                </h2>
                <input
                  type="button" value="删除分类"
                  ref={ input => this._delete = input }
                  onClick={ () => this.handleClick() }
                />
                { diarysItems }
            </div>
        );
    }
}
