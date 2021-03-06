import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

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
        typing: false,
        isFirst: false,
        showEmoji: false,
        files: []
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
        e.preventDefault();

        const {message} = this.state;
        const {auth} = this.props;

        const newMessage = {
            message,
            user: auth.user._id,
        };


        if (message.trim()) {
            socket.emit('NEW_PRIVATE_MESSAGE', newMessage);
            this.setState({message: ''});
        }
    };


    //create new Message
    sendEmoji = id => {

        const {auth} = this.props;

        const newMessage = {
            icon: id,
            user: auth.user._id,
        };

        if (id) {
            socket.emit('ADD_IMAGE', newMessage);
            this.setState({showEmoji: false})
        }

    };


    AddCoolIcon = () => {
        const {auth} = this.props;

        const newMessage = {
            coll: true,
            user: auth.user._id,
        };

        socket.emit('ADD_COOL', newMessage);
    };



    AddFile = file => {
        const files = Array.from(file);
        this.setState({files});
    };


    removePrewievFile = file => {
        console.log(file);
        this.setState({
            files: this.state.files.filter(f => f !== file)
        });
    };


    renderEmoji = () => {
        this.setState({showEmoji: !this.state.showEmoji})
    };


    componentDidMount() {

        socket = io.connect(socketUrl);
        const userId = this.props.match.params.id;
        const {auth} = this.props;

        socket.on('connect', () => {

            const users = {
                myId: auth.user._id,
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
                console.log('SET_PRIVATE_MESSAGE', message);
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

        const {message, messages, user, typing, isFirst, showEmoji, files} = this.state;
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
                                        isFirst={isFirst}
                                        user={auth.user._id}
                                        messages={messages}
                                        sendEmoji={this.sendEmoji}
                                        showEmoji={showEmoji}
                                        files={files}
                                        removePrewievFile={this.removePrewievFile}

                                    />

                                    <MessagesForm
                                        typing={typing}
                                        message={message}
                                        onChange={this.onChange}
                                        onKeyUp={this.onKeyUp}
                                        sendMessage={this.sendMessage}
                                        renderEmoji={this.renderEmoji}
                                        AddCoolIcon={this.AddCoolIcon}
                                        AddFile={this.AddFile}
                                        files={files}
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

export default withRouter(PrivateMessagesIndex);