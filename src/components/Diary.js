import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default class App extends React.PureComponent {
    render() {
        return (
            <div className="Diary">
                <Header />
                    {this.props.children}
                <Footer />
            </div>
        );
    }
}
