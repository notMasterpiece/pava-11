import React, {Component} from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';

import {connect} from 'react-redux';

import Routes from './Routes';

import Navbar from '../components/layout/Navbar';
import RightBar from '../components/layout/RightBar';

import OflineStatus from './Tools/OflineStatus/OflineStatus';
import Spinner from "./Tools/Spinner/Spinner";

let internetTimeOut;

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
        const {dom: {smallRightBar}, auth} = this.props;

        console.log(this.props, 'in dashboard');

        if (serverError) return <Redirect to='/error'/>;

        return (

            <div className={`theme-black ${smallRightBar ? 'menu_sm' : ''}`}>

                <OflineStatus
                    isOnline={isOnline}
                    isOffline={isOffline}
                />

                <Navbar funcShowMobileMenu={this.funcShowMobileMenu}/>

                <RightBar showMobileMenu={showMobileMenu}/>

                <section className="content">
                    <div className="container-fluid">

                        <Switch>
                            {this.renderRoutes()}
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
    profile: state.profile
}))(Dashboard);