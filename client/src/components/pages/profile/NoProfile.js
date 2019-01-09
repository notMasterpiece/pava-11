import React from 'react';
import { Link } from 'react-router-dom';

const NoProfile = ({user}) => {
  return (
    <div className="block-header">
      <div className="row">
        <div className="col-lg-5 col-md-5 col-sm-12">
          <h2>Welcome <strong>{user.name}</strong></h2>
        </div>
      </div>
      <br/>
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            <div className="body">
              У Вас поки що не створений профіль, але це можна виправити :)
              <Link to='/create-profile' style={{marginLeft: '30px'}} className="btn btn-raised btn-primary waves-effect waves-black">Створити профіль</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoProfile;
