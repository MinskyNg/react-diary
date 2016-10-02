import React from 'react';
import DiaryList from './DiaryList';


export default class DiaryCatalog extends React.PureComponent {
    render() {
        let diarysLists = this.props.diarys.map((diary, index) => {
            return (
                <DiaryList
                  key={ index }
                  category={ diary.category }
                  posts={ diary.posts }
                  delCat={ this.props.delCat }
                  delPost={ this.props.delPost }
                />
            );
        });

        return (
            <div className="diary-catalog">
                { diarysLists }
            </div>
        );
    }
    }
