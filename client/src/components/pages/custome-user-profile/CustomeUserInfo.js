import React, { Fragment } from 'react';
import Github from '../../Tools/Github/Github';
import UserDescription from '../profile/UserDescription';

// img
import node from '../../../assets/images/node2.svg';
import react from '../../../assets/images/react1.svg';
import avatar from '../../../assets/images/avatar.png';


function renderUserImg(image) {
    if(!image || image.length <= 10 ) {
        return avatar
    }
    return image;
}


const CustomeUserInfo = ({profile, funcShowGoogleMaps, showGoogleMaps}) => {
  // const {bio, company, date, education, experience, handle, location, skills, status, user, website, github, _id} = profile;
  //   console.log(profile);
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


const renderSkills = skills => {
  if( skills.length) {
    return (
      <Fragment>
        <small className="text-muted">Навики</small>
        <ul className="p-l-0">
          {
            skills.map(s => {
              switch (s.trim()) {
                case 'html':
                  return <li className='badge badge-danger custome-badge-danger' key={s}><i className="zmdi zmdi-language-html5" />{s}</li>;
                case 'node':
                  return <li className='badge badge-danger custome-badge-danger' key={s}><img src={node} alt={s}/> <span>{s}</span></li>;
                case 'react':
                  return <li className='badge badge-danger custome-badge-danger' key={s}><img src={react} alt={s}/> <span>{s}</span></li>;
                default:
                  return <li className='badge badge-danger custome-badge-danger' key={s}><span>{s}</span></li>;
              }
            })
          }
        </ul>
        <hr />
      </Fragment>
    )

  }
};

export default CustomeUserInfo;
