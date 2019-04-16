import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

class MessagesList extends PureComponent {

    render() {

        const {messages, user, isFirst} = this.props;

        return (
            <div className="chat-history">

                { isFirst && <p style={{textAlign: 'center'}}>You don't speak yet, write your first messages</p> }

                {
                    messages.map(m => (
                        <ChatContent
                            key={m.createdAt}
                            className={m.user._id === user ? 'self' : ''}
                        >
                            <ChatMessage>
                                <div className="chat-message-content-w">
                                    <ChatMessageContent>
                                        {m.message}
                                    </ChatMessageContent>
                                </div>
                                <ChatMessageAvatar>
                                    <Img alt="" src={m.user.avatar} />
                                </ChatMessageAvatar>
                                <ChatMessageDate>
                                    {moment(m.createdAt).format('HH.mm')}
                                </ChatMessageDate>
                            </ChatMessage>
                        </ChatContent>
                    ))
                }

            </div>
        );
    }
}

const ChatMessageContent = styled.div`
    padding: 15px 35px; 
    background-color: #fff9f0;
    color: #594939;
    max-width: 400px;
    display: inline-block;
    margin-bottom: -20px;
    margin-left: 20px;
    border-radius: 20px;
    text-align: left;
    @media (max-width: 700px) {
        max-width: 100%;
      }
`;

const ChatMessage = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column; 
  position: relative;
`;



const ChatMessageAvatar = styled.div`
    display: inline-block;
    vertical-align: bottom;
`;


const Img = styled.img`
    width: 40px;
    height: auto;
    border-radius: 30px;
    display: inline-block;
    box-shadow: 0 0 0 10px #fff; 
`;

const ChatMessageDate = styled.div`
    display: inline-block; 
    vertical-align: bottom;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 0.72rem;
    color: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 40px; 
    bottom: 5px;
`;



const ChatContent = styled.div`
  padding: 20px;
  &.self {
    text-align: right;
    ${ChatMessageDate} {
      left: auto;
      right: 40px;
    }
    ${ChatMessageContent} {
        background-color: #f0f9ff;
        color: #2A4E7F;
        margin-right: 20px;
        margin-left: 0;
    }
  }
`;




MessagesList.propTypes = {
    messages: PropTypes.array,
};

export default MessagesList;