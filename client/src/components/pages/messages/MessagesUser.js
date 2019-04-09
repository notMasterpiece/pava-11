import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const MessagesUser = ({user}) => {
    return (
        <li
            className="clearfix">
            <img src={user.avatar} alt={user.name} />
            <div className="about">
                <div className="name">{user.name}</div>
                <div className="status">
                    <i
                        className={`zmdi zmdi-circle ${user.online ? ' online' : 'offline'}`} />
                    data
                </div>
                <ul className="description">
                    <li>
                        <Link to={`/messages/t/${user._id}`}>Write</Link>
                    </li>
                    <li>
                        <Link to={`/profile/${user._id}`}>Go to profile</Link>
                    </li>
                </ul>
            </div>
        </li>
    );
};

MessagesUser.propTypes = {
    user: PropTypes.object.isRequired,
};

export default MessagesUser;