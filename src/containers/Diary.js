import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default class App extends React.PureComponent {
    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Header />
                    {this.props.children}
                <Footer />
            </div>
        );
    }
}
