import React from 'react';
import Github from '../../Tools/Github/Github';
import UserDescription from '../profile/UserDescription';

import avatar from '../../../assets/images/avatar.png';


function renderUserImg(image) {
    if(!image || image.length <= 10 ) {
        return avatar
    }
    return image;
}


const CustomeUserInfo = ({profile, funcShowGoogleMaps, showGoogleMaps, showSmallChat}) => {
  const {status, user, github, image} = profile;
  return (
    <div className="row clearfix profile-page custome-profile-page">
      <div className="col-lg-12 col-md-12">
        <div className="card">
          <div className="body bg-dark profile-header">
            <div className="row">
              <div className="col-lg-10 col-md-12">
                <img src={renderUserImg(image)} className="user_pic rounded img-raised" alt={user.name} />
                  <div className="detail">
                    <div className="u_name">
                      <h4><strong>{user.name}</strong></h4>
                      <span>{status}</span>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          <UserDescription
              profile={profile}
              showGoogleMaps={showGoogleMaps}
              funcShowGoogleMaps={funcShowGoogleMaps}
          />
        </div>
      </div>

      {
        github &&
        <Github github={github} />
      }

    </div>
  );
};

export default CustomeUserInfo;
