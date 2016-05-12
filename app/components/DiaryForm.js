import React from 'react';


class DiaryForm extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        let title = this.refs.title.value.replace(/(^\s*)|(\s*$)/g, '');
        let category = this.refs.category.value.replace(/(^\s*)|(\s*$)/g, '');
        if (title === '' || category === '') return;
        let newDiary = {
            title: title,
            body: this.refs.body.value,
            date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
        };
        this.refs.form.reset();
        this.props.addDiary(category, newDiary);
    }

    render() {
        let style = {
            display: this.props.formShow ? 'block' : 'none'
        };
        let options = this.props.diaryAll.map((diary, index) => {
            return <option key={ index } value={ diary.category }>{ diary.category }</option>;
        });
        return (
            <div style={ style } className="form-wrapper">
                <form ref="form" action="#" onSubmit={ this.handleSubmit.bind(this) }>
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

export default DiaryForm;
