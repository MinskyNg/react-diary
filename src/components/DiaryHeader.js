import React from 'react';


export default class DiaryHeader extends React.PureComponent {
    handleKeyUp(event) {
        if (event.keyCode === 13) {
            const newCategory = event.target.value.replace(/(^\s*)|(\s*$)/g, '');
            if (newCategory !== '' && newCategory !== null) {
                event.target.value = '';
                this.props.addCat(newCategory);
            }
        }
    }

    render() {
        return (
            <header>
                <h1>React Diary</h1>
                <h2>A diary app build on React</h2>
                <input type="text" placeholder="添加分类" onKeyUp={ e => this.handleKeyUp(e) } />
                <input type="button" value="添加日记" onClick={ this.props.toggleForm } />
            </header>
        );
    }
}
