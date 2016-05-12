import React from 'react';


class DiaryHeader extends React.Component {
    handleKeyUp(event) {
        if (event.keyCode === 13) {
            let newCategory = event.target.value.replace(/(^\s*)|(\s*$)/g, '');
            if (newCategory !== '' && newCategory !== null) {
                event.target.value = '';
                this.props.addCategory(newCategory);
            }
        }
    }

    render() {
        return (
            <header>
                    <h1>React Diary</h1>
                    <h2>A diary app build on React</h2>
                    <input type="text" placeholder="添加分类" onKeyUp={ this.handleKeyUp.bind(this) } />
                    <input type="button" value="添加日记" onClick={ this.props.toggleForm } />
            </header>
        );
    }
}

export default DiaryHeader;
