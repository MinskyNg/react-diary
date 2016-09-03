import React, { PropTypes } from 'react';
import DiaryItem from './DiaryItem.js';


export default class DiaryList extends React.Component {
    handleMouseOver() {
        this.refs.delete.style.visibility = 'visible';
    }

    handleMouseOut() {
        this.refs.delete.style.visibility = 'hidden';
    }

    handleClick() {
        if (confirm('确定要删除此分类吗?')) {
            this.props.delCat(this.props.category);
        }
    }

    render() {
        let diarysItem = this.props.posts.map((diary, index) => {
            return <DiaryItem key={ index } category={ this.props.category } {...diary} delPost={ this.props.delPost} />;
        });
        return (
            <div onMouseOver={ () => { this.handleMouseOver(); } } onMouseOut={ () => { this.handleMouseOut(); } } className="diary-list" >
                <h2 className="category">{ this.props.category } ( { this.props.posts.length } )</h2>
                <input ref="delete" type="button" value="删除分类" onClick={ () => { this.handleClick(); } } />
                { diarysItem }
            </div>
        );
    }
}
