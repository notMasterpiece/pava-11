import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MessagesForm from './MessagesForm';
import MessagesList from './MessagesList';
import MessageHeader from './MessageHeader';
import {connect} from 'react-redux';
import {getAllMessages} from '../../../actions/messages';

import {gotoBottom} from '../../../helpers/helpers';
import { Scrollbars } from 'react-custom-scrollbars';
import './Messages.scss';



// socket
import io from 'socket.io-client';
import MessagesUser from "./MessagesUser";
const socketUrl = window.location.origin;
let socket;





class MessagesIndex extends Component {
    constructor(props) {
        super(props);

        this.chatListContainer = React.createRef();

        this.state = {
            socket: null,
            message: '',
            messages: [],
            profiles: [],
            typing: false,
            showEmoji: false,
            files: []
        }

    }


    onChange = e => {
        this.actionForm = e.target.value;
        this.setState({
            [e.target.name]: e.target.value
        }); 
    };



    //create new Message
    sendMessage = e => {
        console.log(this.actionForm);
        e.preventDefault();

        const {message}= this.state;
        const {auth} = this.props;
        const room = 'general';

        const newMessage = {
            message,
            user: auth.user._id,
            room

        };


        if( message.trim() ) {
            socket.emit('NEW_CHAT_MSG', newMessage);
            this.setState({message: ''});
        }
    };



    componentDidMount() {

        socket = io.connect(socketUrl);
        const chatContainer = document.body.querySelector('.chat-history');
        const {_id} = this.props.auth.user;

        socket.on('connect', () => {
            console.log('user connect');

            socket.emit('USER_CONNECT', _id);

            const room = 'general';

            socket.emit('JOIN_ROOM', room, () => {
                // console.log(`user join to room ${room}`);
            });


            socket.on('SERVER_NEW_CHAT_MSG', message => {
                // console.log(message, 'get from server');
                const newMessages = [...this.state.messages, message];
                this.setState({ messages: newMessages });
            });


            socket.on('SERVER_ALL_USERS', profiles => {
                this.setState({ profiles });
            })

        });
    };

    componentWillUnmount() {
        socket.disconnect();
    }


    render() {
        const {message,typing, files, messages, profiles} = this.state;

        const height = window.innerHeight - 60;


        return (


            <section className="chat-app">
                    <div className="row clearfix">
                        <div className="col-lg-8 col-md-7">
                            <div className="card">
                                <div className="body overflowhidden">
                                    <div className="chat" style={{height: height }}>

                                        <MessageHeader />

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

                                        <MessagesForm
                                            message={message}
                                            onChange={this.onChange}
                                            sendMessage={this.sendMessage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-5 people-list-wrap">
                            <div className="card">
                                <div className="body">
                                    <Scrollbars className="people-list" style={{height: height}}>

                                        <div className="tab-content">
                                            <div className="tab-pane active">
                                                <ul
                                                    className="chat-list list-unstyled m-b-0"
                                                    ref={this.chatListContainer}
                                                >
                                                    <h6>Users: {profiles.length}</h6>
                                                    {
                                                        profiles.map(profile => (
                                                            <MessagesUser
                                                                profile={profile}
                                                                key={profile._id}
                                                            />
                                                        ))
                                                    }
                                                </ul>

                                            </div>
                                        </div>
                                    </Scrollbars>
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
