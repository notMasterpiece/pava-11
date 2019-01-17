import React, {Component} from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import MessagesForm from './MessagesForm';
import MessagesList from './MessagesList';
import MessageHeader from './MessageHeader';

import {connect} from 'react-redux';
import {getAllMessages} from '../../../actions/messages';

import defaultImg from '../../../assets/images/noImg.png';

const socketUrl = 'http://localhost:8080';
const socket = io.connect(socketUrl);

class MessagesIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            socket: null,
            message: '',
            messages: []
        }

    }



    componentDidMount() {

        const msgContainer = document.querySelector(".chat-history");

        socket.emit('getAllMessages');

        // get 50 messages on connection
        socket.on('history', messages => {
            this.setState({ messages }, () => {
                msgContainer.scrollTop = msgContainer.scrollHeight;
            });
        });


        socket.on('message', message => {

            this.state.messages.push(message);
            this.setState({messages: this.state.messages}, () => {
                msgContainer.scrollTop = msgContainer.scrollHeight;
            });

        });

    };


    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };


    sendMessage = e => {
        e.preventDefault();
        const {message}= this.state;
        const {auth} = this.props;

        const newMessage = {
            message,
            user: auth.user.name
        };


        if( message.trim() ) {
            socket.emit('msg', newMessage);
            this.setState({message: ''});
        }
    };


    render() {

        const {message, messages} = this.state;


        return (
            <section className="chat-app">
                    <div className="row clearfix">
                        <div className="col-lg-8 col-md-7">
                            <div className="card">
                                <div className="body overflowhidden">
                                    <div className="chat">
                                        <div className="user_detail">
                                            <div className="row profile_state">
                                                <div className="col-12">
                                                    <small className="text-muted">Email address:</small>
                                                    <p>michael@gmail.com</p>
                                                    <hr />
                                                    <small className="text-muted">Phone:</small>
                                                    <p>+ 202-555-9191</p>
                                                    <hr />
                                                    <small className="text-muted">Mobile:</small>
                                                    <p>+ 202-555-2828</p>
                                                    <hr />
                                                    <small className="text-muted">Birth Date:</small>
                                                    <p className="m-b-0">October 22th, 1990</p>
                                                    <hr />
                                                </div>
                                                <div className="col-lg-4 col-md-12 col-6">
                                                    <div className="body">
                                                        <i className="zmdi zmdi-thumb-up col-blue" />
                                                        <h5 className="m-b-0 number count-to" data-from="0"
                                                            data-to="1203" data-speed="1000"
                                                            data-fresh-interval="700">1203</h5>
                                                        <small>Likes</small>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12 col-6">
                                                    <div className="body">
                                                        <i className="zmdi zmdi-account text-success" />
                                                        <h5 className="m-b-0 number count-to" data-from="0"
                                                            data-to="1980" data-speed="1000"
                                                            data-fresh-interval="700">1980</h5>
                                                        <small>Profile Views</small>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12 col-6">
                                                    <div className="body">
                                                        <i className="zmdi zmdi-attachment text-warning" />
                                                        <h5 className="m-b-0 number count-to" data-from="0"
                                                            data-to="52" data-speed="1000"
                                                            data-fresh-interval="700">52</h5>
                                                        <small>Attachment</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

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
                                        <ul className="nav nav-tabs padding-0" role="tablist">
                                            <li className="nav-item inlineblock"><a className="nav-link active"
                                                                                    data-toggle="tab"
                                                                                    href="#people">People</a></li>
                                            <li className="nav-item inlineblock"><a className="nav-link"
                                                                                    data-toggle="tab"
                                                                                    href="#groups">Groups</a></li>
                                        </ul>
                                        <div className="tab-content m-t-20">
                                            <div role="tabpanel" className="tab-pane active"
                                                 id="people">
                                                <ul className="chat-list list-unstyled m-b-0">
                                                    <li className="clearfix">
                                                        <img src={defaultImg} alt="avatar" />
                                                        <div className="about">
                                                            <div className="name">Vincent Porter</div>
                                                            <div className="status"><i
                                                                className="zmdi zmdi-circle offline"></i> left 7
                                                                mins ago
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="clearfix active">
                                                        <img src={defaultImg} alt="avatar" />
                                                        <div className="about">
                                                            <div className="name">Aiden Chavez</div>
                                                            <div className="status"><i
                                                                className="zmdi zmdi-circle online"></i> online
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="clearfix">
                                                        <img src={defaultImg} alt="avatar" />
                                                        <div className="about">
                                                            <div className="name">Mike Thomas</div>
                                                            <div className="status"><i
                                                                className="zmdi zmdi-circle online"></i> online
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="clearfix">
                                                        <img src={defaultImg} alt="avatar" />
                                                        <div className="about">
                                                            <div className="name">Erica Hughes</div>
                                                            <div className="status"><i
                                                                className="zmdi zmdi-circle online"></i> online
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="clearfix">
                                                        <img src={defaultImg} alt="avatar" />
                                                        <div className="about">
                                                            <div className="name">Ginger Johnston</div>
                                                            <div className="status"><i
                                                                className="zmdi zmdi-circle online"></i> online
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="clearfix">
                                                        <img src={defaultImg} alt="avatar" />
                                                        <div className="about">
                                                            <div className="name">Tracy Carpenter</div>
                                                            <div className="status"><i
                                                                className="zmdi zmdi-circle offline"></i> left
                                                                30 mins ago
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="clearfix">
                                                        <img src={defaultImg} alt="avatar" />
                                                        <div className="about">
                                                            <div className="name">Christian Kelly</div>
                                                            <div className="status"><i
                                                                className="zmdi zmdi-circle offline"></i> left
                                                                10 hours ago
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="clearfix">
                                                        <img src={defaultImg} alt="avatar" />
                                                        <div className="about">
                                                            <div className="name">Monica Ward</div>
                                                            <div className="status"><i
                                                                className="zmdi zmdi-circle online"></i> online
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="clearfix">
                                                        <img src={defaultImg} alt="avatar" />
                                                        <div className="about">
                                                            <div className="name">Dean Henry</div>
                                                            <div className="status"><i
                                                                className="zmdi zmdi-circle offline"></i> offline
                                                                since Oct 28
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div role="tabpanel" className="tab-pane stretchRight" id="groups">
                                                <ul className="chat-list list-unstyled m-b-0">
                                                    <li className="clearfix">
                                                        <img src={defaultImg} alt="avatar" />
                                                        <div className="about">
                                                            <div className="name">PHP Lead</div>
                                                            <div className="status">6 People</div>
                                                        </div>
                                                    </li>
                                                    <li className="clearfix">
                                                        <img src={defaultImg} alt="avatar" />
                                                        <div className="about">
                                                            <div className="name">UI UX Designer</div>
                                                            <div className="status">10 People</div>
                                                        </div>
                                                    </li>
                                                    <li className="clearfix">
                                                        <img src={defaultImg} alt="avatar" />
                                                        <div className="about">
                                                            <div className="name">TL Groups</div>
                                                            <div className="status">2 People</div>
                                                        </div>
                                                    </li>
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
