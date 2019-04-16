import React, {Component} from 'react';
import {connect} from 'react-redux';

// socket
import io from 'socket.io-client';
import MessagesForm from "../messages/MessagesForm";
import MessagesList from "../messages/MessagesList";
import {gotoBottom, smoothScroll} from "../../../helpers/helpers";


import Sceleton from '../../Tools/Sceleton/Chat/Chat';

const socketUrl = window.location.origin;
let typing;
let socket;

class PrivateMessagesIndex extends Component {


    state = {
        message: '',
        user: null,
        messages: [],
        isFirst: false,
        typing: false
    };


    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };


    onKeyUp = () => {
        socket.emit('TYPING');
    };


    //create new Message
    sendMessage = e => {
        console.log(e);
        e.preventDefault();

        const {message} = this.state;
        const {auth} = this.props;

        const newMessage = {
            message,
            user: auth.user.id,
        };


        if (message.trim()) {
            socket.emit('NEW_PRIVATE_MESSAGE', newMessage);
            this.setState({message: ''});
        }
    };


    componentDidMount() {

        socket = io.connect(socketUrl);

        const userId = this.props.match.params.id;
        const {auth} = this.props;

        socket.on('connect', () => {
            // console.log('user connect');

            const users = {
                myId: auth.user.id,
                userId
            };

            socket.emit('PRIVATE_CONNECT', users);


            socket.on('SET_USER_INFO', userInfo => {
                this.setState({
                    user: userInfo.user,
                    room: userInfo.room
                })
            });






            // new

            socket.on('SET_PRIVATE_USER_INFO', user => {
                // console.log('SET_PRIVATE_USER_INFO', user);
                this.setState({user});
            });

            socket.on('SET_PRIVATE_ROOM_NO_MESSAGES', () => {
                // console.log('SET_PRIVATE_ROOM_NO_MESSAGES');
                this.setState({
                    isFirst: true
                })
            });

            socket.on('SET_PRIVATE_MESSAGE', message => {
                // console.log('SET_PRIVATE_MESSAGE', message);
                const newMessages = [...this.state.messages, message];
                this.setState({
                    messages: newMessages,
                    isFirst: false
                }, () => {
                    const chatContainer = document.body.querySelector('.chat-history');
                    if (chatContainer) {
                        smoothScroll(chatContainer);
                    }
                })
            });


            socket.on('SET_FIRST_MESSAGES', messages => {
                // console.log('SET_FIRST_MESSAGES', messages);
                this.setState({messages}, () => {
                    const chatContainer = document.body.querySelector('.chat-history');
                    if (chatContainer) {
                        gotoBottom(chatContainer);
                    }

                })
            });




            socket.on('SERVER_TYPING', () => {
                clearTimeout(typing);
                this.setState({typing: true}, () => {
                    typing = setTimeout(() => {
                        this.setState({typing: false})
                    }, 2000)
                })
            })



        });

    }


    componentWillUnmount() {
        socket.disconnect();
    }


    render() {

        const height = window.innerHeight - 60;

        const {message, messages, user, isFirst, typing} = this.state;
        const {auth} = this.props;

        if (!user || !auth) return <Sceleton />;

        return (
            <section className="chat-app">
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12">
                        <div className="card m-0">
                            <div className="body overflowhidden">
                                <div className="chat" style={{height: height}}>
                                    <div className="chat-header clearfix">
                                        <img src={user.avatar} alt="chat room"/>
                                        <div className="chat-with">
                                            {user.name}
                                            <div className="chat-num-messages"> {messages.length} messages</div>
                                        </div>
                                    </div>

                                    <MessagesList
                                        user={auth.user.id}
                                        isFirst={isFirst}
                                        messages={messages}
                                    />

                                    <MessagesForm
                                        typing={typing}
                                        message={message}
                                        onChange={this.onChange}
                                        onKeyUp={this.onKeyUp}
                                        sendMessage={this.sendMessage}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default connect(state => ({
    auth: state.auth
}))(PrivateMessagesIndex);