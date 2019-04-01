import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {getProfileByHangle, getGithubByHangle} from '../../../actions/profileActions';

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


  render() {

    const {showGoogleMaps, showSmallChat} = this.state;
    const {profile, loading} = this.props.profile;
    if( profile === null || loading) return <Spinner />;

    return (
      <CustomeUserInfo
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
}), {getProfileByHangle, getGithubByHangle})(CustomeUserIndex);




