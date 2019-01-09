import React, {Component, Fragment} from 'react';
import Profile from './Profile';

import { Link } from 'react-router-dom';

class AllProfiles extends Component {

  render() {

    const { profiles } = this.props;

    return (
      <Fragment>
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-lg-5 col-md-5 col-sm-12">
              <h2>Teams Board</h2>
              <ul className="breadcrumb padding-0">
                <li className="breadcrumb-item"><Link to='/dashboard'><i className="zmdi zmdi-home" /></Link></li>
                <li className="breadcrumb-item active">Всі профілі</li>
              </ul>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="input-group m-b-0">
                <input type="text" className="form-control" placeholder="Search..."/>
                <div className="input-group-append">
                    <span className="input-group-text"><i className="zmdi zmdi-search" /></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row clearfix'>
          {
            (profiles.length > 0) &&
              profiles.map(el => <Profile key={el._id} profile={el}/>)
          }
        </div>

      </Fragment>
    );
  }
}


export default AllProfiles;
