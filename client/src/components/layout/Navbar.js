import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser, showSmallMenu } from '../../actions/actions';
import { clearProfile } from '../../actions/profileActions';


import Screenfull from '../Tools/Fullscreen';



class Navbar extends Component {


  logout = () => {
    this.props.logoutUser();
    this.props.clearProfile();
    this.props.history.push('/login');
  };

  resizeRightBar = () => {
    this.props.showSmallMenu();
  };


    componentDidMount() {
        let linkArr;
        let link = document.querySelectorAll('#leftsidebar .list li a');

        if(link.length) {
          linkArr = Array.prototype.slice.call(link);
            linkArr.forEach(a => {
              a.addEventListener('click', () => {
                  setTimeout(() => this.props.funcShowMobileMenu(), 300);
              })
            })
        }
    }


    render() {
    const {funcShowMobileMenu} = this.props;
      return (
        <aside id="minileftbar" className="minileftbar">
          <ul className="menu_list">
            <li onClick={funcShowMobileMenu}><a className="bars" /></li>
            <li><a href="javascript:void(0);" className="btn_overlay hidden-sm-down"><i className="zmdi zmdi-search" /></a></li>

            <li onClick={this.resizeRightBar}>
                <a className="menu-sm"><i className="zmdi zmdi-swap" /></a>
            </li>

            <li className="menuapp-btn"><a href="javascript:void(0);"><i className="zmdi zmdi-apps"></i></a></li>
            <li className="notifications badgebit">
              <a href="javascript:void(0);">
                <i className="zmdi zmdi-notifications"></i>
                <div className="notify">
                  <span className="heartbit"></span>
                  <span className="point"></span>
                </div>
              </a>
            </li>

            <li>
              <Link to={'/messages'}>
                <i className="zmdi zmdi-email" />
              </Link>
            </li>

            <Screenfull />

            {/*bottom*/}
            <li className="power">
              <Link to={'/settings'} className="js-right-sidebar">
                <i className="zmdi zmdi-settings zmdi-hc-spin" />
              </Link>
              <a className='mega-menu' onClick={this.logout}>
                <i className="zmdi zmdi-power" />
              </a>
            </li>
          </ul>
        </aside>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  showSmallMenu: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(state => ({
  auth: state.auth
}), {logoutUser, clearProfile, showSmallMenu})(withRouter(Navbar));
