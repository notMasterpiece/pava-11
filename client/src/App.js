import './assets/styles/main.scss';
import React, {useEffect} from 'react';

//redux
import { Provider } from 'react-redux';
import store from './store/store';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Forgot from './components/auth/Forgot';
import ResetPass from './components/auth/ResetPass';
import Dashboard from './components/Dashboard';
import Error500 from './components/pages/500/Error_500';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {loadUser} from "./actions/auth-action";
import {setAuthToken} from './helpers/helpers';

import moment from 'moment';
moment.locale('ua');

if(localStorage.color) {
    document.body.style.backgroundColor = localStorage.color;
}

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {

    useEffect(() => {
        store.dispatch(loadUser())
    }, []);

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

// maybe bed
document.body.addEventListener('click', e => {
    if( document.body.querySelector('.dropdown-menu.show') && e.target !== document.body.querySelector('.delete-education') ) {
        const elem = document.querySelector('.dropdown-menu.show li');
        if( elem ) elem.parentNode.removeChild(elem);
    }
});

export default App;