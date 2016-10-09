import React from 'react';


export default class Header extends React.PureComponent {
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
            <header className="header">
                <h1>React Diary</h1>
                <input type="text" onKeyUp={e => this.handleSearch(e)} />
            </header>
        );
    }
}
