import React, { Component } from 'react';

import { Home } from './Home';
import './App.css';
import { Route } from 'react-router';
import { Layout } from './component/Navigation/Layout';

class App extends Component {
    public render() {
        return (
            <Layout>
                <Route exact path="/" component={Home} />
            </Layout>
        );
    }
}

export default App;
