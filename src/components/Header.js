/**
*页面顶部
**/


import React from 'react';
import { browserHistory } from 'react-router';


export default class Header extends React.PureComponent {
    // 处理搜索框
    handleSearch(event) {
        if (event.keyCode === 13) {
            const keyword = event.target.value.replace(/(^\s*)|(\s*$)/g, '');
            if (keyword !== null && keyword !== '') {
                event.target.value = '';
                browserHistory.push(`/search/${keyword}`);
            }
        }
    }


    render() {
        return (
            <header className="header" style={{ display: this.props.fullScreen ? 'none' : 'block' }}>
                <i className="icon-react" title="回到首页"
                  onClick={() => browserHistory.push('/')}
                ></i>
                <h1>React Diary</h1>
                <div>
                    <i className="icon-search"></i>
                    <input type="text" placeholder="Seach here" onKeyUp={e => this.handleSearch(e)} />
                </div>
            </header>
        );
    }
}
