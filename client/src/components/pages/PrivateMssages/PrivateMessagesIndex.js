import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';




// socket
import io from 'socket.io-client';
import Spinner from "../../Tools/Spinner/Spinner";
import MessagesForm from "../messages/MessagesForm";
import MessagesList from "../messages/MessagesList";
import {gotoBottom} from "../../../helpers/helpers";
const socketUrl = 'http://localhost:8080';
const socket = io.connect(socketUrl);



class PrivateMessagesIndex extends Component {


    state = {
        message: '',
        user: this.props.match.params.id,
        room: null,
        messages: []
    };


    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };



    //create new Message
    sendMessage = e => {
        e.preventDefault();

        const receiver = this.props.match.params.id;
        const {message}= this.state;
        const {auth} = this.props;

        const newMessage = {
            message,
            sender: auth.user.id,
            receiver
        };


        if( message.trim() ) {
            socket.emit('NEW_PRIVATE_MESSAGE', newMessage);
            this.setState({message: ''});
        }
    };


    componentDidMount() {


        const obj1 = {
            name: 'vasa',
            age: 26
        };

        const obj2 = {...obj1};

        console.log(obj2);
        obj2.age = 27;


        console.log(obj2);
        console.log(obj1);


        const userId = this.props.match.params.id;
        const {auth} = this.props;

        socket.on('connect', () => {
            console.log('user connect');

            const users = {
                myId : auth.user.id,
                userId
            };

            socket.emit('PRIVATE_CONNECT', users);


            socket.on('SET_USER_INFO', userInfo => {
                this.setState({
                    user: userInfo.user,
                    room: userInfo.room
                })
            });

            socket.on('SET_PRIVATE_MESSAGE', message => {
                console.log(message);
                const newMessages = [...this.state.messages, message];
                this.setState({ messages: newMessages }, ()=> {
                    const chatContainer = document.body.querySelector('.chat-history');
                    gotoBottom(chatContainer);
                })
            });



            socket.on('SET_FIRST_MESSAGES', messages => {
                console.log(messages);
                this.setState({ messages }, ()=> {
                    const chatContainer = document.body.querySelector('.chat-history');
                    // gotoBottom(chatContainer);
                })
            })


        });

    }


    render() {

        const {user, message, messages} = this.state;

        if (!user) return <Spinner />;

        return (
            <section className="chat-app">
                <div className="row clearfix">
                    <div className="col-lg-8 col-md-7">
                        <div className="card">
                            <div className="body overflowhidden">
                                <div className="chat">
                                    <div className="chat-header clearfix">
                                        <a className="btn-detail" href="/">
                                            <img
                                                src={user.avatar}
                                                alt="avatar"/>
                                        <div className="chat-about">
                                            <div className="chat-with">{user.name}</div>
                                            <div className="chat-num-messages">already {messages.length} messages</div>
                                        </div>
                                    </a></div>
                                    <hr />


                                    <MessagesList
                                        messages={messages}
                                    />


                                    <hr />

                                    <MessagesForm
                                        message={message}
                                        onChange={this.onChange}
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

PrivateMessagesIndex.propTypes = {};

export default connect(state => ({
    auth: state.auth
}))(PrivateMessagesIndex);