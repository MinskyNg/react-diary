import React from 'react';


export default class App extends React.PureComponent {
    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                {this.props.children}
            </div>
        );
    }
}
