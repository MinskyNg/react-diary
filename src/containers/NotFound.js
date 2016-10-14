/*
404组件
*/


import React from 'react';
import { connect } from 'react-redux';
import { changeNavName } from '../actions';


class Home extends React.PureComponent {
    componentDidMount() {
        this.props.dispatch(changeNavName('PageNotFound'));
    }


    render() {
        return (
            <div className="notfound">
                <h2>404</h2>
                <p>Page not found</p>
                <button onClick={() => this.props.router.replace('/')}>Back To Home</button>
            </div>
        );
    }
}


export default connect()(Home);
