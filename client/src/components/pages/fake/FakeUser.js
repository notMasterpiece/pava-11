import React from 'react';
import PropTypes from 'prop-types';

const FakeUser = ({user}) => {

    const {avatar, name, email} = user;

    return (
        <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card">
                <div className="body text-center">
                    <div className="chart easy-pie-chart-1">
                        <span>
                            <img
                                src={avatar}
                                alt={name}
                                className="rounded-circle"
                            />
                        </span>
                    </div>
                    <h6>{name}</h6>
                    <small>{email}</small>
                </div>
            </div>
        </div>
    );
};

FakeUser.propTypes = {
    user: PropTypes.object.isRequired,
};

export default FakeUser;