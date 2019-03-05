import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profileActions';

import User from './User';
import Spinner from '../Tools/Spinner/Spinner';

class RightBar extends Component {

  componentDidMount() {
    this.props.getAllProfiles();
  }

  renderPostsCount = () => {
    const {posts} = this.props.posts;
     if (posts && posts.length ) return <span className="badge badge-default float-right">{posts.length}</span>;
     return false;
  };


  renderGoToProfile = () => {
    const {url} = this.props.match;
    if( url !== '/') {
      return (
          <Link to={'/'}><i className="zmdi zmdi-home" />
            <span>Профіль</span>
          </Link>
      )
    } else {
      return (
          <button ><i className="zmdi zmdi-home" />
            <span>Профіль</span>
          </button>
      )
    }
  };


  componentWillReceiveProps () {

  }


  renderUser = () => {
      const { user } = this.props.auth;
      const { profile } = this.props.profile;
      const {url} = this.props.match;
      return url !== '/' &&
          <li>
              <User
                  user={ user }
                  profile={profile}
              />
          </li>
  };


  render() {
      const {showMobileMenu} = this.props;
    const { all_profiles } = this.props.profile;

      return (
      <aside className="right_menu">

        <div id="leftsidebar" className={`sidebar ${showMobileMenu ? 'show-mobile' : ''}`}>
          <div className="menu">
            <ul className="list">

                { this.renderUser() }

              <li className="header">MAIN</li>

              <li className="active open">
                { this.renderGoToProfile() }
              </li>

              <li>
                <Link to={'/feed'} className="menu-toggle">
                  <i className="zmdi zmdi-edit" />
                  <span>Написати</span>
                </Link>
              </li>
              <li>
                <Link to={'/posts?page=1'} className="menu-toggle">
                  <i className="zmdi zmdi-swap-alt" />
                  <span>Пости</span>
                  { this.renderPostsCount() }
                </Link>
              </li>
              <li className="header">EXTRA COMPONENTS</li>
              <li>
                <Link
                  to={'/profiles'}
                  className="menu-toggle"
                  >
                  <i className="zmdi zmdi-delicious" />
                  <span>Профілі</span>
                  { !all_profiles ? <Spinner /> : <span className="badge badge-default float-right">{all_profiles.length - 1}</span> }
                </Link>
              </li>
                <li>
                    <Link to={'/admin'} className="menu-toggle">
                        <i className="zmdi zmdi-lock" />
                        <span>Адмін</span>
                    </Link>
                </li>
                <li className="header">EXTRA COMPONENTS</li>

                <li>
                    <Link to={'/blog/post-create'}>
                        <i className="zmdi zmdi-edit" />
                        <span> Написати статтю</span>
                    </Link>
                </li>

                <li>
                    <Link to={'/blog'}>
                        <i className="zmdi zmdi-delicious" />
                        <span>Статті</span>
                    </Link>
                </li>
                <li>
                    <Link to={'/calendar'}>
                        <i className="zmdi zmdi-calendar-check" />
                        <span>Календар</span>
                    </Link>
                </li>



            </ul>
          </div>
        </div>
      </aside>
    );
  }
}

RightBar.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  all_profiles: PropTypes.object.isRequired,
};

export default connect(state => ({
  auth: state.auth,
  profile: state.profile,
  all_profiles : state.profile,
  posts: state.posts
}), {getAllProfiles})(withRouter(RightBar));
