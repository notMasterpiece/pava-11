import React, {Component} from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profileActions';
import NoProfile from './NoProfile';
import ProfileActions from './profileActions';


import Spinner from '../../Tools/Spinner/Spinner';



class Content extends Component {

  renderContent = () => {

    const { user } = this.props.auth;
    const {profile, loading} = this.props.profile;

    if (profile === null || loading) {
      return <Spinner />
    } else {
      if (Object.keys(profile).length > 0) {
        return <ProfileActions />
      } else {
        return <NoProfile user={user} />
      }
    }
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return this.renderContent();
  }
}

// Content.propTypes = {};
export default connect(state => ({
  auth: state.auth,
  profile: state.profile
}), {getCurrentProfile})(Content);
