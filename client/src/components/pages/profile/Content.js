import React, {Component} from 'react';

import {connect} from 'react-redux';

import NoProfile from './NoProfile';
import ProfileActions from './profileActions';
import Spinner from '../../Tools/Spinner/Spinner';


class Content extends Component {

    render() {
        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;

        if (loading) return <Spinner/>;

        if (profile) return <ProfileActions/>;

        return <NoProfile user={user}/>;
    }
}

export default connect(state => ({
    auth: state.auth,
    profile: state.profile
}))(Content);
