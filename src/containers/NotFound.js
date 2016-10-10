import React from 'react';
import { connect } from 'react-redux';
import { changeNavName } from '../actions';


class Home extends React.PureComponent {
    componentDidMount() {
        this.props.dispatch(changeNavName('NotFound'));
    }

    render() {
        return (
            <div className="notfound">Looks like you got lost</div>
        );
    }
}


export default connect()(Home);
