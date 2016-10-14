/*
主体组件
*/


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';


class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            height: this.props.fullScreen ? document.body.scrollHeight : document.body.scrollHeight - 60
        };
        this.updateHeight = this.updateHeight.bind(this);
    }


    componentDidMount() {
        window.addEventListener('resize', this.updateHeight);
    }


    componentWillReceiveProps(nextProps) {
        // 切换全屏模式时，修改高度计算方式
        if (this.props.fullScreen !== nextProps.fullScreen) {
            this.setState({
                height: nextProps.fullScreen ? document.body.scrollHeight : document.body.scrollHeight - 60
            });
        }
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.updateHeight);
    }


    // 调整高度
    updateHeight() {
        this.setState({
            height: this.props.fullScreen ? document.body.scrollHeight : document.body.scrollHeight - 60
        });
    }


    render() {
        const { fullScreen, router } = this.props;
        return (
            <div style={{ height: '100%' }}>
                <Header
                  fullScreen={fullScreen}
                  router={router}
                />
                <div style={{ height: `${this.state.height}px` }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}


App.propTypes = {
    fullScreen: PropTypes.bool.isRequired
};


function selector(state) {
    return {
        fullScreen: state.get('fullScreen')
    };
}

export default connect(selector)(App);
