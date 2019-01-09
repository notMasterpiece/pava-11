import React from 'react';
import PropTypes from 'prop-types';

// const User = ({user, profile}) => {
const User = ({user, profile}) => {
    return (
      <div className="user-info m-b-20">
        <div className="image">
          { profile && profile.image &&  <img src={profile.image} alt={user.name} /> }
        </div>
        <div className="detail">
          <h6>{user.name}</h6>
          <p className="m-b-0">{user.email}</p>
          {/*{ (profile !== 'undefined' && !!profile.social !== null && profile.social.twitter !== 'undefined' ) && <Link to={profile.social.twitter}><i className="zmdi zmdi-twitter" /></Link> }*/}
          {/*{ (profile !== 'undefined' && !!profile.social !== null && profile.social.facebook !== 'undefined' ) && <Link to={profile.social.facebook}><i className="zmdi zmdi-facebook"></i></Link> }*/}
          {/*{ (profile !== 'undefined' && !!profile.social !== null && profile.social.youtube !== 'undefined' ) && <Link to={profile.social.youtube}><i className="zmdi zmdi-youtube-play"></i></Link> }*/}
          {/*{ (profile !== 'undefined' && !!profile.social !== null && profile.social.linkedin !== 'undefined' ) && <Link to={profile.social.linkedin}><i className="zmdi zmdi-linkedin"></i></Link> }*/}
        </div>
      </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default User;
