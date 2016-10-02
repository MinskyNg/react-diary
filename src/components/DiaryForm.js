import React from 'react';


export default class DiaryForm extends React.PureComponent {
    handleSubmit(event) {
        event.preventDefault();
        const title = this._title.value.replace(/(^\s*)|(\s*$)/g, '');
        const category = this._category.value.replace(/(^\s*)|(\s*$)/g, '');
        if (title === '' || category === '') return;
        const date = new Date();
        const newDiary = {
            title,
            body: this._body.value,
            date: `${date.getFullYear()}-${date.getMonth() + 1}-
              ${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        };
        this._form.reset();
        this.props.addPost(category, newDiary);
    }

    render() {
        let options = this.props.diarys.map((diary, index) => {
            return <option key={ index } value={ diary.category }>{ diary.category }</option>;
        });
        return (
            <div
              className="form-wrapper"
              style={{ display: this.props.showForm ? 'block' : 'none' }}
            >
                <form
                  action="#"
                  ref={ form => this._form = form }
                  onSubmit={ e => this.handleSubmit(e) }
                >
                    <select ref={ select => this._category = select }>
                        { options }
                    </select>
                    <input
                      type="text" placeholder="标题"
                      ref={ input => this._title = input }
                    />
                    <textarea
                      placeholder="写点东西吧......( 支持markdown )"
                      ref={ textarea => this._body = textarea }
                    >
                    </textarea>
                    <input type="submit" value="确认" onClick={ this.props.toggleForm } />
                    <input type="button" value="取消" onClick={ this.props.toggleForm } />
                </form>
            </div>
        );
    }
}

