/**
 * 页面顶部
 * @function Header
 * @prop {boolean} fullScreen 是否全屏
 */


import React from 'react';
import { browserHistory } from 'react-router';


export default function Header({ fullScreen }) {
    // 处理搜索框
    function handleSearch(e) {
        if (e.keyCode === 13) {
            const keyword = e.target.value.replace(/(^\s*)|(\s*$)/g, '');
            if (keyword !== null && keyword !== '') {
                e.target.value = '';
                browserHistory.push(`/search/${keyword}`);
            }
        }
    }


    return (
        <header className="header" style={{ display: fullScreen ? 'none' : 'block' }}>
            <i className="icon-react" title="回到首页"
              onClick={() => browserHistory.push('/')}
            ></i>
            <h1>React Diary</h1>
            <div>
                <i className="icon-search"></i>
                <input type="text" placeholder="Seach here" onKeyUp={handleSearch} />
            </div>
        </header>
    );
}
