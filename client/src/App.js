import './assets/styles/main.scss';
import React from 'react';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Forgot from './components/auth/Forgot';
import ResetPass from './components/auth/ResetPass';
import Dashboard from './components/Dashboard';
import Error500 from './components/pages/500/Error_500';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {setAuthToken} from './helpers/helpers';

import { Provider } from 'react-redux';
import store from './store/store';

if(localStorage.color) {
    document.body.style.backgroundColor = localStorage.color;
}

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {

    return (
        <Provider store={ store }>
            <Router>
                <Switch>
                    <Route exact path='/login' component={ Login } />
                    <Route exact path='/register' component={ Register } />
                    <Route exact path='/forgot' component={ Forgot } />
                    <Route exact path='/password_reset/:token' component={ ResetPass } />
                    <Route exact path='/error' component={ Error500 } />
                    <Route exact path='*' component={ Dashboard } />
                </Switch>
            </Router>
        </Provider>
    )
};

export default App;