import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import AllProfiles from './AllProfiles';

import { getAllProfiles } from '../../../actions/profile-action';
import Spinner from '../../Tools/Spinner/Spinner';

class AllProfilesIndex extends Component {

  componentDidMount() {
    this.props.getAllProfiles();
  }

  render() {
    const {loading, profiles} = this.props.profile;
    const id = '123';

    if (loading) return <Spinner />;

    if (profiles) {
      const filterProfile = profiles.filter(profile => profile.user._id !== id);
      return <AllProfiles profiles={filterProfile}/>
    }

    return <p>Користувачів не знайдено ...</p>;



  }
}

AllProfiles.propTypes = {
  getAllProfiles: PropTypes.func
};

export default connect(state => ({
  profile: state.profile,
  auth: state.auth
}), {getAllProfiles})(AllProfilesIndex);
