import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components'
import Emoji from '../../Tools/MyEmoji/Emoji';


let t0,
    t1;
const today = moment().startOf('day');

class MessagesList extends PureComponent {

    componentDidUpdate(prevProps, prevState, snapshot) {
        t1 = performance.now();
        console.log("RENDER TIME " + (t1 - t0).toFixed(3) + " milliseconds.");
        console.log('Update');
    }

    renderMessages = () => {
        t0 = performance.now();
        console.log('renderMessage');

        const {messages, user, isFirst} = this.props;



        if (isFirst) {
            return <p style={{textAlign: 'center'}}>You don't speak yet, write your first messages</p>
        }

        if (!messages.length) return;


        const messageArray = [];

            // first day
            //     messageArray.push(<ChatDay key={moment(messages[0].createdAt)}><span>{moment(messages[0].createdAt).format('LL')}</span></ChatDay>)
            // first day


        for (let i = 0; i < messages.length; i++) {

            if (messages[i].icon.length) {

                messageArray.push(
                    <ChatContent
                        key={messages[i]._id}
                        className={messages[i].user._id === user ? 'self' : ''}
                    >
                        <ChatMessageFlex>
                            <ChatIcon>
                                <img
                                    src={`${window.location.origin}/files/emoji/${messages[i].icon}.gif`}
                                    alt={`${messages[i].icon}`}
                                />
                            </ChatIcon>
                            <ChatMessageDate>
                                {moment(messages[i].createdAt).format('HH.mm')}
                            </ChatMessageDate>
                        </ChatMessageFlex>
                    </ChatContent>
                );
                // continue;
            } else {


                if (messages[i + 1]) {

                    messageArray.push(
                        <ChatContent
                            key={messages[i]._id}
                            className={messages[i].user._id === user ? 'self' : ''}
                        >
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


                        </ChatContent>
                    )


                } else {

                    messageArray.push(
                        <ChatContent
                            key={messages[i]._id}
                            className={messages[i].user._id === user ? 'self' : ''}
                        >
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


            {/*check same day*/}

            if(messages[i + 1]) {

                if (moment(messages[i + 1].createdAt).isAfter(moment(messages[i].createdAt), 'd')) {

                    if (moment(messages[i + 1].createdAt).isSame(today, 'd')) {
                        messageArray.push(<ChatDay key={messages[i].createdAt}><span>Сьогодні</span></ChatDay>)
                    } else {
                        messageArray.push(<ChatDay key={messages[i].createdAt}><span>{moment(messages[i + 1].createdAt).format('LL')}</span></ChatDay>)
                    }
                }
            }

            {/*check same day*/}




        }

        return messageArray;

    };


    render() {
        t0 = performance.now();

        const {sendEmoji, showEmoji, messages} = this.props;

        return (
            <div className="chat-history">

                {this.renderMessages()}

                {showEmoji && <Emoji sendEmoji={sendEmoji} />}

            </div>
        );
    }
}

const ChatMessageContent = styled.div`
    padding: 15px 35px; 
    background-color: #ffa000; 
    color: white;
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
    height: 40px;
    object-fit: cover;
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

const ChatMessageFlex = styled.div`
  display: flex;
  align-self: flex-end;
  position: relative;
  margin: 20px 0 0 0;
  padding: 2px 20px;
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
        background-color: #0288d1;
        margin-right: 20px;
        margin-left: 0;
        border-radius: 11px 0 11px 11px;
    }
    ${ChatMessageFlex} {
      justify-content: flex-end;
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


const ChatIcon = styled.div`
  
`;




MessagesList.propTypes = {
    messages: PropTypes.array,
};

export default MessagesList;