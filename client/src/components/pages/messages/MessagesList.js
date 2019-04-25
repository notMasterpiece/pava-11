import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
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

        messageArray.push(<ChatDay key={messages[0].createdAt}><span>{moment(messages[0].createdAt).format('LL')}</span></ChatDay>);

        for (let i = 0; i < messages.length; i++) {

            if (messages[i - 1] ) {

                if (moment(messages[i - 1].createdAt).isBefore(moment(messages[i].createdAt), 'd')) {

                    if (moment(messages[i].createdAt).isSame(today, 'd')) {
                        messageArray.push(<ChatDay key={messages[i].createdAt}><span>Сьогодні</span></ChatDay>)
                    } else {
                        messageArray.push(<ChatDay key={messages[i].createdAt}><span>{moment(messages[i].createdAt).format('LL')}</span></ChatDay>)
                    }
                }

            }


            if (messages[i].cool) {
                messageArray.push(
                    <ChatContent
                        key={messages[i]._id}
                        className={messages[i].user._id === user ? 'self' : ''}
                    >
                        <ChatMessageFlex>
                            <ChatIcon>
                                <svg role="img" height="50px" width="50px" viewBox="0 0 256 256" x="0px" y="0px"><title id="js_il">Чудово</title><g><g><polyline fill="transparent" points="256,0 258,256 2,258 "></polyline><path d="M254,147.1c0-12.7-4.4-16.4-9-20.1c2.6-4.2,5.1-10.2,5.1-18c0-15.8-12.3-25.7-32-25.7h-52c-0.5,0-1-0.5-0.9-1
                                 c1.4-8.6,3-24,3-31.7c0-16.7-4-37.5-19.3-45.7c-4.5-2.4-8.3-3.7-14.1-3.7c-8.8,0-14.6,3.6-16.7,5.9c-1.3,1.4-1.9,3.3-1.8,5.2
                                 l1.3,34.6c0.2,2.8-0.3,5.4-1.6,7.7l-24,47.8c-1.7,3.5-4.2,6.6-7.6,8.5c-3.5,2-6.5,5.9-6.5,9.5v94.8C78,230,94,238,112.3,238h86.1
                                 c13.5,0,22.4-4.5,27.2-13.5c4.4-8.2,3.2-15.8,1.4-21.5c7.4-2.3,14.8-8,16.9-18.3c1.3-6.6-0.7-12.1-2.9-16.2
                                 C247.5,165,254,159.8,254,147.1z" fill="#0084ff" stroke="transparent" strokeLinecap="round" strokeWidth="5%" /><path d="M56.2,100H13.8C7.3,100,2,105.3,2,111.8v128.5c0,6.5,5.3,11.8,11.8,11.8h42.4c6.5,0,11.8-5.3,11.8-11.8V111.8
                                 C68,105.3,62.7,100,56.2,100z" fill="#0084ff" /></g></g></svg>
                            </ChatIcon>
                            <ChatMessageDate>
                                {moment(messages[i].createdAt).format('HH.mm')}
                            </ChatMessageDate>
                        </ChatMessageFlex>
                    </ChatContent>
                );
                continue;
            }


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
                continue;
            }


            if (messages[i + 1]) {

                if ( messages[i].user._id === messages[i + 1].user._id) {
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
                                <ChatMessageDate>
                                    {moment(messages[i].createdAt).format('HH.mm')}
                                </ChatMessageDate>
                            </ChatMessage>
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

        return messageArray;

    };



    renderFilePrewiev = () => {
      const {files, removePrewievFile} = this.props;
      if (files.length) {
          const filesArr = Array.from(files);
          return filesArr.map(file => {
              const link =  URL.createObjectURL(file);
              return (
                <PrewievItem>
                    <i
                        className="zmdi zmdi-close-circle"
                        onClick={() => removePrewievFile(file)}
                    />
                    <PrewievImg  src={link} alt="prewiev" />
                </PrewievItem>
              )
          });
      }
    };

    render() {
        t0 = performance.now();

        const {sendEmoji, showEmoji, files} = this.props;

        return (
            <div className="chat-history">

                {this.renderMessages()}

                {showEmoji && <Emoji sendEmoji={sendEmoji} />}


                {
                    files &&
                    <PrewievWrap>
                        { this.renderFilePrewiev() }
                    </PrewievWrap>
                }

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


const PrewievImg = styled.img`
  max-width: 150px; 
`;


const PrewievItem = styled.div`
  display: inline-block;
  margin-right: 10px;
  position: relative;
  .zmdi-close-circle {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;


const PrewievWrap = styled.div` 
    position: absolute;
    left: 0;
    right: 10px;
    bottom: 60px;
    background: #fff;
    padding: 10px;
`;




MessagesList.propTypes = {
    messages: PropTypes.array,
};

export default MessagesList;