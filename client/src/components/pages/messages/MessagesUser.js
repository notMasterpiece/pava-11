import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Sceleton from '../../Tools/Sceleton/Chat/Chat';
const MessagesUser = ({profile}) => {

    const {user} = profile;

    if( !user) return <Sceleton />;

    return (
        <UserLi>
            <Link to={`/messages/t/${user._id}`}>
                <UserImg src={user.avatar} alt={user.name} />
                <div className="about">
                    <UserName>{user.name}</UserName>
                    <div className="status">
                        <i className={`zmdi zmdi-circle ${user.online ? ' online' : 'offline'}`} />
                        { user.online ? 'online' : 'offline' }
                    </div>
                </div>
            </Link>
            <UserBtn className="description">
                 <Link to={`/profile/${profile._id}`}>Go to profile</Link>
            </UserBtn>
        </UserLi>
    );
};

const UserName = styled.div`
  color: #313740;
`;

const UserBtn = styled.div`
  color: #9A9A9A;
  font-weight: 300;
  display: flex;
  align-items: center;
  margin-left: auto; 
  transform: scale(0);
  transition: transform 300ms ease;  
`;

const UserImg = styled.img`
  width: 45px;
  height: 45px;
`;

const UserLi = styled.div`
    padding: 10px 15px;
    list-style: none;
    border-radius: 3px; 
    display: flex;
    a {
      color: #313740;
      display: block;
      cursor: pointer; 
    }
    &:hover {
      background-color: #efefef;
      ${UserBtn} { 
        transform: scale(1);
      }
    }
`;

MessagesUser.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default MessagesUser;