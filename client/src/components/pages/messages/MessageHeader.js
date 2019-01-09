import React from 'react';
import defaultImg from "../../../assets/images/noImg.png";

const MessageHeader = () => {
    return (
        <div className="chat-header clearfix">
            <a href="javascript:void(0);" className="btn-detail">
                <img src={defaultImg} alt="avatar" />
                <div className="chat-about">
                    <div className="chat-with">Aiden Chavez</div>
                    <div className="chat-num-messages">already 8 messages</div>
                </div>
            </a>
        </div>
    );
};

export default MessageHeader;