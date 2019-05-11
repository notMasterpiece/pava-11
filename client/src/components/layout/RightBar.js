import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import navlink from '../navlink';
import MenuLink from '../Tools/Menu/MenuLink';
import User from './User';

class RightBar extends Component {
    renderUser = () => {
        const {user} = this.props.auth;
        const {profile} = this.props.profile;
        const {url} = this.props.match;
        if (!user) return;
        return url !== '/' &&
            <li>
                <User
                    user={user}
                    profile={profile}
                />
            </li>
    };


    render() {
        const {showMobileMenu} = this.props;

        return (
            <aside className="right_menu">

                <div id="leftsidebar" className={`sidebar ${showMobileMenu ? 'show-mobile' : ''}`}>
                    <div className="menu">
                        <ul className="list">
                            {this.renderUser()}

                            {navlink.map((link, key) => (
                                <MenuLink
                                    link={link}
                                    key={key}
                                />
                            ))}
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
    all_profiles: state.profile,
    posts: state.posts
}))(withRouter(RightBar));
