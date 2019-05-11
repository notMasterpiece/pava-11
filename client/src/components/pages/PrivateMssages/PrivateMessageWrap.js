import React from 'react';
import PropTypes from 'prop-types';
import PrivateMessagesIndex from './PrivateMessagesIndex';
import Spinner from '../../Tools/Spinner/Spinner';

import {connect} from 'react-redux';

const PrivateMessagesWrap = ({auth}) => {
    if (!auth.user) return <Spinner />;

    return (
        <PrivateMessagesIndex auth={auth} />
    );
};

PrivateMessagesWrap.propTypes = {
    auth: PropTypes.object.isRequired,
};

export default connect(state => ({
    auth: state.auth
}))(PrivateMessagesWrap);