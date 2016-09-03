import React, { PropTypes } from 'react';


export default class DiaryForm extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        const title = this.refs.title.value.replace(/(^\s*)|(\s*$)/g, '');
        const category = this.refs.category.value.replace(/(^\s*)|(\s*$)/g, '');
        if (title === '' || category === '') return;
        const date = new Date();
        const newDiary = {
            title: title,
            body: this.refs.body.value,
            date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        };
        this.refs.form.reset();
        this.props.addPost(category, newDiary);
    }

    render() {
        let style = {
            display: this.props.showForm ? 'block' : 'none'
        };
        let options = this.props.diarys.map((diary, index) => {
            return <option key={ index } value={ diary.category }>{ diary.category }</option>;
        });
        return (
            <div style={ style } className="form-wrapper">
                <form ref="form" action="#" onSubmit={ (e) => { this.handleSubmit(e); } }>
                    <select ref="category" >
                        { options }
                    </select>
                    <input ref="title" type="text" placeholder="标题" />
                    <textarea ref="body" placeholder="写点东西吧......( 支持markdown )" ></textarea>
                    <input type="submit" value="确认" onClick={ this.props.toggleForm } />
                    <input type="button" value="取消" onClick={ this.props.toggleForm } />
                </form>
            </div>
        );
    }
}


DiaryForm.propTypes = {
    toggleForm: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired
};
