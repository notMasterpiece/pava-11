import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import Spinner from '../../Tools/Spinner/Spinner';
import AllProfiles from './AllProfiles';

import { getAllProfiles } from '../../../actions/profileActions'

class AllProfilesIndex extends Component {

  componentDidMount() {
    this.props.getAllProfiles();
  }

  showProfile = () => {
    const id = this.props.auth.user.id;
    const {loading, all_profiles} = this.props.profile;

    if(all_profiles === null || loading) {
      return <Spinner />
    } else {
      if(all_profiles.length > 0) {
        const filterProfile = all_profiles.filter(profile => profile.user._id !== id);
        return <AllProfiles profiles={filterProfile}/>

      } else {
        return <p>Користувачів не знайдено ...</p>
      }
    }
  };

  render() {

    return (
      <Fragment>
        {this.showProfile()}
      </Fragment>
    );
  }
}

AllProfiles.propTypes = {
  getAllProfiles: PropTypes.func
};

export default connect(state => ({
  profile: state.profile,
  auth: state.auth
}), {getAllProfiles})(AllProfilesIndex);
