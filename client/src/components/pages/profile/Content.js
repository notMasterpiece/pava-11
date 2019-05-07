import React, {Component} from 'react';

import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profile-action';
import NoProfile from './NoProfile';
import ProfileActions from './profileActions';


import Spinner from '../../Tools/Spinner/Spinner';



class Content extends Component {

  renderContent = () => {

    const { user } = this.props.auth;
    const {profile, loading} = this.props.profile;

    if ( profile === null || loading ) return <Spinner />;

    if (Object.keys(profile).length > 0) return <ProfileActions />;

    return <NoProfile user={user} />
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return this.renderContent();
  }
}

export default connect(state => ({
  auth: state.auth,
  profile: state.profile
}), {getCurrentProfile})(Content);
