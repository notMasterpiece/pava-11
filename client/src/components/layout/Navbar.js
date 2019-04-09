import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser, showSmallMenu } from '../../actions/actions';
import { clearProfile } from '../../actions/profileActions';


import Screenfull from '../Tools/Fullscreen';



class Navbar extends Component {


  logout = () => {
    const {auth} = this.props;
    const {id} = auth.user;

    this.props.logoutUser(id);
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
            <li onClick={funcShowMobileMenu}><button className="bars" /></li>

            <li onClick={this.resizeRightBar}>
                <button className="menu-sm">
                  <i className="zmdi zmdi-swap" />
                </button>
            </li>

            <li>
              <Link to={'/chat'}>
                <i className="zmdi zmdi-email" />
              </Link>
            </li>

            <Screenfull />

            {/*bottom*/}
            <li className="power">
              <Link to={'/settings'} className="js-right-sidebar">
                <i className="zmdi zmdi-settings zmdi-hc-spin" />
              </Link>
              <button className='mega-menu' onClick={this.logout}>
                <i className="zmdi zmdi-power" />
              </button>
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
