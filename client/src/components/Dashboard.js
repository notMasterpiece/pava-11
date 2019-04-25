import React, {Component} from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';

import {connect} from 'react-redux';
import store from "../store/store";

import Routes from './Routes';

import Navbar from '../components/layout/Navbar';
import RightBar from '../components/layout/RightBar';

import OflineStatus from './Tools/OflineStatus/OflineStatus';

import jwt_decode from "jwt-decode";
import {setAuthToken} from '../helpers/helpers';
import {setCurrentUser, logoutUser} from '../actions/actions';
import {clearProfile} from '../actions/profileActions';

let internetTimeOut;


if (localStorage.jwtToken) {
    //Set auth token
    setAuthToken(localStorage.jwtToken);
    //Decode token
    const decode = jwt_decode(localStorage.jwtToken);
    //Set user and isAuthenticated
    store.dispatch(setCurrentUser(decode));

    // logout user
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
        store.dispatch(logoutUser());
        store.dispatch(clearProfile());
        window.location.href = '/login';
    }
}


class Dashboard extends Component {

    state = {
        showMobileMenu: false,
        isOffline: false,
        isOnline: false,
        serverError: false
    };


    funcShowMobileMenu = () => {
        const {showMobileMenu} = this.state;
        this.setState({showMobileMenu: !showMobileMenu});
    };


    setOffline = () => {
        clearTimeout(internetTimeOut);
        this.setState({
            isOffline: true,
            isOnline: false
        })


    };

    setOnline = () => {
        this.setState({
            isOnline: true,
            isOffline: false
        }, () => {
            internetTimeOut = setTimeout(() => {
                this.setState({
                    isOffline: false,
                    isOnline: false
                })
            }, 2000)
        })
    };


    componentDidMount() {
        window.addEventListener('online', this.setOnline);
        window.addEventListener('offline', this.setOffline);
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.setOnline);
        window.removeEventListener('offline', this.setOffline);
    }


    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.errors && nextProps.errors.status && nextProps.errors.status === 500) {
            return {
                serverError: true
            };
        }
        return null;
    }



    renderRoutes = () => {
        return Routes.map(route => (
            <Route
                exact
                key={route.path}
                path={route.path}
                component={route.component}
            />
        ))
    };


    render() {

        const {showMobileMenu, isOffline, isOnline, serverError} = this.state;
        const {auth, dom: {smallRightBar}} = this.props;

        if (auth.isAuthenticated !== true) {
            return <Redirect to='/login'/>
        }

        if (serverError) return <Redirect to='/error'/>;

        return (

            <div className={`theme-black ${smallRightBar ? 'menu_sm' : ''}`}>

                <OflineStatus
                    isOnline={isOnline}
                    isOffline={isOffline}/>

                {/*<Proggres/>*/}

                <Navbar funcShowMobileMenu={this.funcShowMobileMenu} />

                <RightBar showMobileMenu={showMobileMenu} />

                <section className="content">
                    <div className="container-fluid">

                        <Switch>
                            { this.renderRoutes() }
                            <Route path='*' render={() => <Redirect to='/not-found'/>}/>
                        </Switch>
                    </div>
                </section>

            </div>
        );
    }
}

export default connect(state => ({
    auth: state.auth,
    dom: state.dom,
    errors: state.errors,
}))(Dashboard);