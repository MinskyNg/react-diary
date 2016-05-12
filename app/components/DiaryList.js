import React from 'react';
import DiaryItem from './DiaryItem.js';


class DiaryList extends React.Component {
    handleMouseOver() {
        this.refs.delete.style.visibility = 'visible';
    }

    handleMouseOut() {
        this.refs.delete.style.visibility = 'hidden';
    }

    handleClick() {
        if (confirm('确定要删除此分类吗?')) {
            this.props.deleteCategory(this.props.category);
        }
    }

    render() {
        let diarysItem = this.props.diarys.map((diary, index) => {
            return <DiaryItem key={ index } category={ this.props.category } {...diary} deleteDiary={ this.props.deleteDiary} />;
        });
        return (
            <div onMouseOver={ this.handleMouseOver.bind(this) } onMouseOut={ this.handleMouseOut.bind(this) } className="diary-list" >
                <h2 className="category">{ this.props.category } ( { this.props.diarys.length } )</h2>
                <input ref="delete" type="button" value="删除分类" onClick={ this.handleClick.bind(this) } />
                { diarysItem }
            </div>
        );
    }
}

export default DiaryList;
