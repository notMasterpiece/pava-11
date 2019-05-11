import React from 'react';
import PropTypes from 'prop-types';
import MessagesIndex from './MessagesIndex';
import Spinner from '../../Tools/Spinner/Spinner';

import {connect} from 'react-redux';

const MessagesWrap = ({auth}) => {
    if (!auth.user) return <Spinner />;

    return (
        <MessagesIndex auth={auth} />
    );
};

MessagesWrap.propTypes = {
    auth: PropTypes.object.isRequired,
};

export default connect(state => ({
    auth: state.auth
}))(MessagesWrap);