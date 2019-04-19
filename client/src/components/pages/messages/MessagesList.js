import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';


import Emoji from '../../Tools/MyEmoji/Emoji';

const today = moment().startOf('day');

class MessagesList extends PureComponent {


    renderFistMessageDay = i => {

        const {messages} = this.props;

        if (i === 0) {
            return (
                <ChatDay><span>{moment(messages[i].createdAt).format('LL')}</span></ChatDay>
            )
        }

    };



    renderMessageDay = i => {

        const {messages} = this.props;

        if (moment(messages[i + 1].createdAt).isAfter(moment(messages[i].createdAt), 'd')) {

            if (moment(messages[i + 1].createdAt).isSame(today, 'd')) {
                return <ChatDay><span>Сьогодні</span></ChatDay>
            }
            return <ChatDay><span>{moment(messages[i + 1].createdAt).format('LL')}</span></ChatDay>

        }
    };


    renderMessages = () => {

        const {messages, user, isFirst} = this.props;

        if (isFirst) {
            return <p style={{textAlign: 'center'}}>You don't speak yet, write your first messages</p>
        }

        const messageArray = [];

        for (let i = 0; i < messages.length; i++) {


            if (!messages[i].message.length && messages[i].icon.length) {

                messageArray.push(
                    <p>this is icon</p>
                );
            }

            if (messages[i + 1]) {

                messageArray.push(
                    <ChatContent
                        key={messages[i].createdAt}
                        className={messages[i].user._id === user ? 'self' : ''}
                    >

                        {/*first day*/}

                        {this.renderFistMessageDay(i)}

                        {/*first day*/}


                        {
                            messages[i].user._id === messages[i + 1].user._id
                                ?
                                <ChatMessage>
                                    <div>
                                        <ChatMessageContent>
                                            {messages[i].message}
                                        </ChatMessageContent>
                                    </div>
                                    <ChatMessageDate>
                                        {moment(messages[i].createdAt).format('HH.mm')}
                                    </ChatMessageDate>
                                </ChatMessage>
                                :
                                <ChatMessage>
                                    <div>
                                        <ChatMessageContent>
                                            {messages[i].message}
                                        </ChatMessageContent>
                                    </div>
                                    <ChatMessageAvatar>
                                        <Img alt="" src={messages[i].user.avatar}/>
                                    </ChatMessageAvatar>
                                    <ChatMessageDate>
                                        {moment(messages[i].createdAt).format('HH.mm')}
                                    </ChatMessageDate>
                                </ChatMessage>
                        }

                        {/*check same day*/}
                        {this.renderMessageDay(i)}
                        {/*check same day*/}


                    </ChatContent>
                )


            } else {


                messageArray.push(
                    <ChatContent
                        key={messages[i].createdAt}
                        className={messages[i].user._id === user ? 'self' : ''}
                    >

                        {/*first day*/}

                        {this.renderFistMessageDay(i)}

                        {/*first day*/}

                        <ChatMessage>
                            <div>
                                <ChatMessageContent>
                                    {messages[i].message}
                                </ChatMessageContent>
                            </div>
                            <ChatMessageAvatar>
                                <Img alt="" src={messages[i].user.avatar}/>
                            </ChatMessageAvatar>
                            <ChatMessageDate>
                                {moment(messages[i].createdAt).format('HH.mm')}
                            </ChatMessageDate>
                        </ChatMessage>
                    </ChatContent>
                )

            }
        }

        return messageArray;

    };


    render() {

        const {sendEmoji} = this.props;

        return (
            <div className="chat-history">

                {this.renderMessages()}


                <Emoji sendEmoji={sendEmoji} />

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
    margin-left: 20px;
    border-radius: 0 11px 11px 11px;
    text-align: left;
    @media (max-width: 700px) {
        max-width: 100%;
      }
`;

const ChatMessage = styled.div`
  margin-top: 20px; 
  position: relative;
`;


const ChatMessageAvatar = styled.div`
    position: absolute;
    left: 0;
    bottom: -25px;
    background-color: #fff;
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
    left: 10px; 
    top: -15px;
`;


const ChatContent = styled.div`
  padding: 0 20px 5px 20px;
  &.self {
    text-align: right;
    ${ChatMessageDate} {
      left: auto;
      right: 10px;
    }
    ${ChatMessageAvatar} {
      left: auto;
      right: 0;
    }
    ${ChatMessageContent} {
        background-color: #f0f9ff;
        color: #2A4E7F;
        margin-right: 20px;
        margin-left: 0;
        border-radius: 11px 0 11px 11px;
    }
  }
`;


const ChatDay = styled.div`
  text-align: center;
  position: relative;
  margin-top: 20px;
  span {
    font-size: 15px;
    display: inline-block;
    background-color: #fff;
    position: relative;
    padding: 0 25px;
  }
  &:before {
    content: '';
    position: absolute;
    top: 11px;
    left: 20px;
    right: 20px;
    height: 1px;
    background-color: #eee;
    
  }
`;


MessagesList.propTypes = {
    messages: PropTypes.array,
};

export default MessagesList;