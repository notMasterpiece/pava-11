import React from 'react';
import PropTypes from 'prop-types';
import avatar from '../../../assets/images/avatar.png';

import { Link } from 'react-router-dom';


function renderUserImg(image) {
    if(!image || image.length <= 10 ) {
      return avatar
    }
    return image;
}

const Profile = ({profile}) => {
  const {user, bio, company, handle, location, status, website, skills, github, image } = profile;

  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 user-profile">
      <div className="card">
        <div className="body min-h-275">
          <Link to={`/profile/${handle}`}><img className='round-img' src={renderUserImg(image)} title={user.name} alt={user.name}/></Link>
          <h6 className="m-b-15 team-info m-t-7">
            <Link to={`/profile/${handle}`} >{user.name}</Link>
            {/*<span className="badge badge-success float-right">New</span>*/}
          </h6>

          <div className="row m-t-25">
            <div className="col-12">
              { handle && <h6>handle: {handle}</h6> }
              { company && <div>Компанія: {company}</div> }
              { location && <div>Місце проживання : { location } </div> }
              { status && <div>Посада: { status } </div> }
              { skills && <ul className='list-unstyled m-b-0'>Навики: {skills.map( (skill, index) => <li className='badge badge-success m-l-10' key={index}><i className="zmdi zmdi-check va-m m-r-5 "></i>{skill}</li> )} </ul> }
              { website && <div>Сайт: <a href={website} title={website}>{ website }</a> </div> }
              { bio && <div>Опис: {bio}</div> }
              { github && <div><i className="zmdi zmdi-github-alt m-r-5 va-m" /><Link to={github}>{github}</Link></div> }
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Profile;
