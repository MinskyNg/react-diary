/*
页面头部
*/


import React from 'react';


export default class Header extends React.PureComponent {
    // 处理搜索框
    handleSearch(event) {
        if (event.keyCode === 13) {
            const keyword = event.target.value.replace(/(^\s*)|(\s*$)/g, '');
            if (keyword !== null && keyword !== '') {
                event.target.value = '';
                this.props.router.push(`/search/${keyword}`);
            }
        }
    }


    render() {
        return (
            <header className="header" style={{ display: this.props.fullScreen ? 'none' : 'block' }}>
                <i className="icon-react" title="回到首页"
                  onClick={() => this.props.router.push('/')}
                ></i>
                <h1>React Diary</h1>
                <div>
                    <i className="icon-search"></i>
                    <input type="text" onKeyUp={e => this.handleSearch(e)} />
                </div>
            </header>
        );
    }
}
