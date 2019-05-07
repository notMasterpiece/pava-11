import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import Experience from '../../layout/Experince';
import Education from '../../layout/Education';
import UserDescription from './UserDescription';

import {deleteAccount} from '../../../actions/profile-action';

class ProfileActions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showGoogleMaps: false,
            showUserGallery: true
        }
    }

    funcShowGoogleMaps = () => {
        this.setState({showGoogleMaps: !this.state.showGoogleMaps})
    };

    onDeleteAcount = () => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className='custom-ui'>
                        <div className="modal-content">
                            <i className="zmdi zmdi-close" onClick={onClose}/>
                            <div className="modal-header">
                                <h4 className="title">Ви впевненні?</h4>
                            </div>
                            <div className="modal-body">
                                Профіль буде видалено... Нажаль... Ви його не повернете... !!
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-round waves-effect" onClick={onClose}>Ні
                                </button>
                                <button type="button" className="btn btn-danger btn-round waves-effect" onClick={() => {
                                    this.props.deleteAccount();
                                    onClose()
                                }}>Так, я впевнений
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        });
    };


    render() {
        const {showGoogleMaps, showUserGallery} = this.state;
        const {profile} = this.props.profile;
        const {status, experience, education} = this.props.profile.profile;
        const {name, email, avatar} = this.props.auth.user;


        return (

            <div className="profile-page">

                <div className="block-header">
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <h2>Ваш профіль</h2>
                        </div>
                    </div>
                </div>

                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12">
                        <div className="card">
                            <div className="body bg-dark profile-header">
                                <div className="row">

                                    <div className="col-lg-10 col-md-12">
                                        <img src={avatar} className="user_pic rounded img-raised" alt={name}/>

                                        <div className="detail">
                                            <div className="u_name">
                                                <h4><strong>{name}</strong></h4>
                                                <div className='user-status'>{status}</div>
                                                <a href={`mailto:${email}`}>{email}</a>
                                                <div className='user-social'>
                                                    {(profile && profile.social && profile.social.linkedin) &&
                                                    <Link to={profile.social.linkedin}><i
                                                        className="zmdi zmdi-linkedin"/></Link>}
                                                    {(profile && profile.social && profile.social.facebook) &&
                                                    <Link to={profile.social.facebook}><i
                                                        className="zmdi zmdi-facebook"/></Link>}
                                                    {(profile && profile.social && profile.social.twitter) &&
                                                    <Link to={profile.social.twitter}><i className="zmdi zmdi-twitter"/></Link>}
                                                    {(profile && profile.social && profile.social.youtube) &&
                                                    <Link to={profile.social.youtube}><i
                                                        className="zmdi zmdi-youtube-play"/></Link>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/*render user description*/}
                        <UserDescription
                            showUserGallery={showUserGallery}
                            profile={profile}
                            showGoogleMaps={showGoogleMaps}
                            funcShowGoogleMaps={this.funcShowGoogleMaps}
                        />

                        <div className="row">

                            {
                                (Object.keys(education).length > 0) &&
                                <div className="col-lg-6 col-md-12">
                                    <div className="card">
                                        <div className="header">
                                            <h2><strong>Навчання</strong></h2>
                                        </div>
                                        {
                                            education.map(singleEducation => {
                                                return <Education
                                                    education={singleEducation}
                                                    key={singleEducation._id}
                                                />
                                            })
                                        }
                                    </div>

                                </div>
                            }

                            {
                                (Object.keys(experience).length > 0) &&
                                <div className="col-lg-6 col-md-12">

                                    <div className="card">
                                        <div className="header">
                                            <h2><strong>Досвід роботи</strong></h2>
                                        </div>
                                        {
                                            experience.map(singleExperience => {
                                                return <Experience key={singleExperience._id}
                                                                   experience={singleExperience}/>
                                            })
                                        }
                                    </div>

                                </div>
                            }

                        </div>
                    </div>
                </div>

                <div className="row clearfix">

                    <div className="col-sm-3">
                        <div className="card">
                            <div className="body">
                                <p>Ви можете змінити свій профіль</p>
                                <ul className='edit-profile'>
                                    <li><Link to='edit-profile' className="btn btn-primary btn-block">Змінити
                                        профіль</Link></li>
                                    <li><Link to='add-experience' className="btn btn-primary btn-block">Додати досвід
                                        роботи</Link></li>
                                    <li><Link to='add-education' className="btn btn-primary btn-block">Додати
                                        навчання</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3"/>
                    <div className="col-sm-3"/>

                    <div className="col-sm-3">
                        <div className="card">
                            <div className="body">
                                <p>Ви можете видалити свій профіль</p>
                                <button
                                    className='btn btn-danger btn-block'
                                    onClick={this.onDeleteAcount}>
                                    Видалити акаунт
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

ProfileActions.propTypes = {
    profile: PropTypes.object.isRequired
};

export default connect(state => ({
    profile: state.profile,
    auth: state.auth
}), {deleteAccount})(ProfileActions);
