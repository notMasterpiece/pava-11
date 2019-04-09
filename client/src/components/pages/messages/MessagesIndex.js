import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MessagesForm from './MessagesForm';
import MessagesList from './MessagesList';
import MessageHeader from './MessageHeader';

import {connect} from 'react-redux';
import {getAllMessages} from '../../../actions/messages';

import defaultImg from '../../../assets/images/noImg.png';
import {gotoBottom} from '../../../helpers/helpers';

import './Messages.scss';



// socket
import io from 'socket.io-client';
import MessagesUser from "./MessagesUser";
const socketUrl = 'http://localhost:8080';
const socket = io.connect(socketUrl);





class MessagesIndex extends Component {
    constructor(props) {
        super(props);

        this.chatListContainer = React.createRef();

        this.state = {
            windowHeight: 0,
            socket: null,
            message: '',
            messages: [],
            users: []
        }

    }


    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };



    //create new Message
    sendMessage = e => {
        e.preventDefault();

        const {message}= this.state;
        const {auth} = this.props;
        const room = this.props.match.params.id || 'general';

        const newMessage = {
            message,
            user: auth.user.id,
            room

        };


        if( message.trim() ) {
            socket.emit('NEW_CHAT_MSG', newMessage);
            this.setState({message: ''});
        }
    };


    componentDidMount() {

        const windowHeight = window.innerHeight;
        this.setState({windowHeight});

        const chatContainer = document.body.querySelector('.chat-history');
        const {id} = this.props.auth.user;

        socket.on('connect', () => {
            console.log('user connect');

            socket.emit('USER_CONNECT', id);

            const room = this.props.match.params.id || 'general';

            socket.emit('JOIN_ROOM', room, () => {
                console.log(`user join to room ${room}`);
            });


            socket.on('SERVER_NEW_CHAT_MSG', message => {
                console.log(message, 'get from server');
                const newMessages = [...this.state.messages, message];
                this.setState({ messages: newMessages }, ()=> {
                    gotoBottom(chatContainer);
                })
            });


            socket.on('SERVER_ALL_USERS', users => {
                this.setState({ users });
            })

        });




    };


    render() {

        const {message, messages, users, windowHeight} = this.state;


        return (
            <section className="chat-app">
                    <div className="row clearfix">
                        <div className="col-lg-8 col-md-7">
                            <div className="card">
                                <div className="body overflowhidden">
                                    <div className="chat">

                                        <MessageHeader />

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
                        <div className="col-lg-4 col-md-5">
                            <div className="card">
                                <div className="body">
                                    <div id="plist" className="people-list">

                                        <div className="tab-content m-t-20">
                                            <div className="tab-pane active">

                                                { users.length ?
                                                    <div className="block-header">
                                                         <h2>Користувачів { users.length }</h2>
                                                    </div> : null
                                                }

                                                <ul
                                                    className="chat-list list-unstyled m-b-0"
                                                    ref={this.chatListContainer}
                                                >
                                                    {
                                                        users.map(user => (
                                                            <MessagesUser
                                                                user={user}
                                                                key={user._id}
                                                            />
                                                        ))
                                                    }
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        );
    }
}

MessagesIndex.propTypes = {
    auth: PropTypes.object.isRequired,
    getAllMessages: PropTypes.func.isRequired,
};

export default connect(state => ({
   auth: state.auth,
   messages: state.messages
}), {getAllMessages})(MessagesIndex);
