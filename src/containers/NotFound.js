/**
 * 404页面
 * @class NotFound
 */


import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { changeNavName } from '../actions';


class NotFound extends React.PureComponent {
    componentDidMount() {
        this.props.dispatch(changeNavName('PageNotFound'));
    }


    render() {
        return (
            <div className="notfound">
                <h2>404</h2>
                <p>Page not found</p>
                <button onClick={() => browserHistory.replace('/')}>Back To Home</button>
            </div>
        );
    }
}


export default connect()(NotFound);
