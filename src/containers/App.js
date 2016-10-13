import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Aside from '../components/Aside';


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
        if (this.props.fullScreen !== nextProps.fullScreen) {
            this.setState({
                height: nextProps.fullScreen ? document.body.scrollHeight : document.body.scrollHeight - 60
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateHeight);
    }

    updateHeight() {
        this.setState({
            height: this.props.fullScreen ? document.body.scrollHeight : document.body.scrollHeight - 60
        });
    }

    render() {
        const { postIds, categories, asideShow, fullScreen, router } = this.props;
        return (
            <div style={{ height: '100%' }}>
                <Header
                  fullScreen={fullScreen}
                  router={router}
                />
                <div style={{ height: `${this.state.height}px` }}>
                    <Aside
                      postLen={postIds.length}
                      categories={categories}
                      asideShow={asideShow}
                    />
                    {this.props.children}
                </div>
            </div>
        );
    }
}


App.propTypes = {
    postIds: PropTypes.array.isRequired,
    categories: PropTypes.object.isRequired,
    asideShow: PropTypes.bool.isRequired,
    fullScreen: PropTypes.bool.isRequired
};


function selector(state) {
    return {
        postIds: state.getIn(['diarys', 'postIds']).toJS(),
        categories: state.getIn(['diarys', 'categories']).toJS(),
        asideShow: state.get('asideShow'),
        fullScreen: state.get('fullScreen')
    };
}

export default connect(selector)(App);
