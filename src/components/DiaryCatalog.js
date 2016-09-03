import React, { PropTypes } from 'react';
import DiaryList from './DiaryList';


export default class DiaryCatalog extends React.Component {
    render() {
        let diarysList = this.props.diarys.map((diary, index) => {
            return <DiaryList key={ index } category={ diary.category } posts={ diary.posts } delCat={ this.props.delCat } delPost={ this.props.delPost} />;
        });
        return (
            <div className="diary-catalog">
                { diarysList }
            </div>
        );
    }
}

DiaryCatalog.propTypes = {
    delCat: PropTypes.func.isRequired,
    delPost: PropTypes.func.isRequired
};
