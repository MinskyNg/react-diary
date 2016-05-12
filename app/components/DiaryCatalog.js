import React from 'react';
import DiaryList from './DiaryList';


class DiaryCatalog extends React.Component {
    render() {
        let diarysList = this.props.diaryAll.map((diary, index) => {
            return <DiaryList key={ index } category={ diary.category } diarys={ diary.posts } deleteCategory={ this.props.deleteCategory } deleteDiary={ this.props.deleteDiary} />;
        });
        return (
            <div className="diary-catalog">
                { diarysList }
            </div>
        );
    }
}

export default DiaryCatalog;

