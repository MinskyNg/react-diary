import React from 'react';
import DiaryHeader from './DiaryHeader.js';
import DiaryForm from './DiaryForm.js';
import DiaryCatalog from './DiaryCatalog.js';
import DiaryFooter from './DiaryFooter.js';


class DiaryApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diaryAll: this.props.diarySource,
            formShow: false
        };
    }

    // 控制创建表单的显示
    toggleForm() {
        this.setState({
            formShow: !this.state.formShow
        });
    }

    // 添加分类
    addCategory(newCategory) {
        for (let index = 0; index < this.props.diarySource.length; index++) {
            if (this.props.diarySource[index].category === newCategory) {
                return false;
            }
        }
        this.props.diarySource.push({ category: newCategory, posts: [] });
        let diaryStorage = JSON.stringify(this.props.diarySource);
        localStorage.setItem('diary', diaryStorage);
        this.setState({ diaryAll: this.props.diarySource });
    }

    // 删除分类
    deleteCategory(category) {
        for (let index = 0; index < this.props.diarySource.length; index++) {
            if (this.props.diarySource[index].category === category) {
                this.props.diarySource.splice(index, 1);
                let diaryStorage = JSON.stringify(this.props.diarySource);
                localStorage.setItem('diary', diaryStorage);
                this.setState({ diaryAll: this.props.diarySource });
                break;
            }
        }
    }

    // 添加日记
    addDiary(category, newDiary) {
        for (let index = 0; index < this.props.diarySource.length; index++) {
            if (this.props.diarySource[index].category === category) {
                this.props.diarySource[index].posts.push(newDiary);
                let diaryStorage = JSON.stringify(this.props.diarySource);
                localStorage.setItem('diary', diaryStorage);
                this.setState({ diaryAll: this.props.diarySource });
                break;
            }
        }
    }

    // 删除日记
    deleteDiary(category, date) {
        for (let index = 0; index < this.props.diarySource.length; index++) {
            if (this.props.diarySource[index].category === category) {
                let posts = this.props.diarySource[index].posts;
                for (let i = 0; i < posts.length; i++) {
                    if (posts[i].date === date) {
                        posts.splice(i, 1);
                        let diaryStorage = JSON.stringify(this.props.diarySource);
                        localStorage.setItem('diary', diaryStorage);
                        this.setState({ diaryAll: this.props.diarySource });
                        break;
                    }
                }
            }
        }
    }


    render() {
        return (
            <div className="conatiner">
                <DiaryForm formShow={ this.state.formShow } toggleForm={ this.toggleForm.bind(this) } diaryAll={ this.state.diaryAll } addDiary={ this.addDiary.bind(this) } />
                <DiaryHeader  addCategory={ this.addCategory.bind(this) } toggleForm={ this.toggleForm.bind(this) } />
                <DiaryCatalog diaryAll={ this.state.diaryAll } deleteCategory={ this.deleteCategory.bind(this) } deleteDiary={ this.deleteDiary.bind(this) } />
                <DiaryFooter />
            </div>
        );
    }
}


export default DiaryApp;
