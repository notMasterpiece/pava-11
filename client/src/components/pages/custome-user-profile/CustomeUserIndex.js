import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {getProfileByHangle, getGithubByHangle} from '../../../actions/profileActions';
import { createChatToUser } from '../../../actions/small-chat';

import CustomeUserInfo from './CustomeUserInfo';
import Spinner from '../../Tools/Spinner/Spinner';

class CustomeUserIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            github: '',
            showGoogleMaps: false,
            showSmallChat: false
        }

    }

    funcShowGoogleMaps = () => {
        this.setState({showGoogleMaps: !this.state.showGoogleMaps})
    };


    componentDidMount() {
        const { handle } = this.props.match.params;
        if( handle ) this.props.getProfileByHangle(handle);
    }


    createChatFunc = () => {
        const {profile} = this.props.profile;
        this.props.createChatToUser(profile.user._id);
    };


    render() {

        const {showGoogleMaps, showSmallChat} = this.state;
        const {profile, loading} = this.props.profile;
        if( profile === null || loading) return <Spinner />;

        return (
            <CustomeUserInfo
                createChatToUser={this.createChatFunc}
                profile={profile}
                showGoogleMaps={showGoogleMaps}
                showSmallChat={showSmallChat}
                funcShowGoogleMaps={this.funcShowGoogleMaps} />
        );
    }
}

CustomeUserIndex.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHangle: PropTypes.func.isRequired,
    getGithubByHangle: PropTypes.func.isRequired
};

export default connect(state => ({
    profile: state.profile
}), {getProfileByHangle, getGithubByHangle, createChatToUser})(CustomeUserIndex);


