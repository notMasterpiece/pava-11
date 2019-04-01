import React from 'react';
import defaultImg from "../../../assets/images/noImg.png";
import { Link } from 'react-router-dom';

const MessageHeader = () => {
    return (
        <div className="chat-header clearfix">
            <Link to={'/'} className="btn-detail">
                <img src={defaultImg} alt="avatar" />
                <div className="chat-about">
                    <div className="chat-with">Aiden Chavez</div>
                    <div className="chat-num-messages">already 8 messages</div>
                </div>
            </Link>
        </div>
    );
};

export default MessageHeader;