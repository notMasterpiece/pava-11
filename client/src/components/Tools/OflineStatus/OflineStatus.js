import React from 'react';
import PropTypes from 'prop-types';

const OflineStatus = ({isOnline, isOffline}) => {
    if ( isOnline ) {
        return (
            <div className="fixed-alert alert alert-success">
                Internet is GOOD
            </div>
        )
    }
    if ( isOffline ) {
        return (
            <div className="fixed-alert alert alert-danger">
                You success has trouble with internet
            </div>
        )
    }

    return null;
};

OflineStatus.propTypes = {
    isOnline: PropTypes.bool.isRequired,
    isOffline: PropTypes.bool.isRequired,
};

export default OflineStatus;