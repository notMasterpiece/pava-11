import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import GoogleMaps from '../../Tools/GoogleMaps/GoogleMaps';
import {Link} from 'react-router-dom';


const UserDescription = ({profile, showGoogleMaps, funcShowGoogleMaps, showUserGallery}) => {
    // object to arr
    // const arr = Object.keys(profile).map((k) => profile[k]);

    const {bio, company, date, location, skills, website, _id} = profile;
    return (
        <div className="card">
            <div className="body empty">

                {
                    location &&
                    <Fragment>
                        <small className="text-muted">Місце проживання</small>
                        <p>{location}</p>
                        <p className='maps-link'><button onClick={funcShowGoogleMaps}>{ !showGoogleMaps ? 'Показати на карті' : 'Приховати карту'}</button></p>
                        {
                            showGoogleMaps &&
                                <GoogleMaps
                                location={location}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZzdhlz8kH-MFnCrbJ_NNOHQTg5M_W__U&language=uk"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                />
                        }
                        <hr/>
                    </Fragment>
                }
                {
                    company &&
                    <Fragment>
                        <small className="text-muted">Місце роботи</small>
                        <p>{company}</p>
                        <hr/>
                    </Fragment>
                }
                {
                    website &&
                    <Fragment>
                        <small className="text-muted">Сайт</small>
                        <p><a target='_blank' href={website}><i
                            className="zmdi zmdi-globe custome-zmdi-globe"/>{website}</a></p>
                        <hr/>
                    </Fragment>
                }
                {
                    bio &&
                    <Fragment>
                        <small className="text-muted">Детальна інформація</small>
                        <p>{bio}</p>
                        <hr/>
                    </Fragment>
                }

                {renderSkills(skills)}

                {
                    date &&
                    <Fragment>
                        <small className="text-muted">Зареєстровано</small>
                        <p>{moment(date).fromNow()}</p>
                        <hr/>
                    </Fragment>
                }
                {
                    showUserGallery && <Link to={`/gallery/${_id}`} > Моя галерея</Link>
                }
            </div>
        </div>

    );
};


const renderSkills = skills => {
    if (skills.length) {
        return (
            <Fragment>
                <small className="text-muted">Навики</small>
                <ul className="p-l-0">
                    {
                        skills.map(s => {
                            switch (s.trim()) {
                                default:
                                    return <li className='badge badge-danger custome-badge-danger' key={s}>
                                        <span>{s}</span></li>;
                            }
                        })
                    }
                </ul>
                <hr/>
            </Fragment>
        )

    }
};

UserDescription.propTypes = {
    profile: PropTypes.object.isRequired,
    showGoogleMaps: PropTypes.bool,
    funcShowGoogleMaps: PropTypes.func,
};

export default UserDescription;
