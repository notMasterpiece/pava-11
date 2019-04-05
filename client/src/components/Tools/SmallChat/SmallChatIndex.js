import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './SmallChat.scss';

class SmallChatIndex extends Component {

    constructor(props) {
        super(props);
        this.messagesContainer = React.createRef();

        this.state = {
            message: '',
            messages: [],

        };
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps, 'nextProps');
        // console.log(prevState, 'prevState');
        return null;
    }




    sendMessage = e => {
        e.preventDefault();
        const {message} = this.state;
        const {chat, myId, socket} = this.props;

        const newMessage = {
            room: chat.chatRoom._id,
            message,
            user: myId
        };

        socket.emit('CREATE_SMALL_CHAT_MSG', newMessage);
        this.setState({message: ''})
    };


    // socketFunc = (() => {
    //     socket.on('added-message', message => {
    //         const newMessages = [...this.state.messages, message];
    //         this.setState({ messages: newMessages }, ()=> {
    //             gotoBottom(this.messagesContainer.current);
    //         })
    //     });
    //     socket.on('SET_ALL_MESSAGES', messages => {
    //         const newMessages = [...this.state.messages, ...messages];
    //         this.setState({ messages: newMessages }, ()=> {
    //             gotoBottom(this.messagesContainer.current);
    //         })
    //     })
    // })();




    renderMessages = () => {
        const {myId} = this.props;
        const {messages} = this.state;

        return messages.map(m => {
            return (
              <div
                  className={`message ${m.user === myId ? 'self' : ''}`}
                  key={m._id}
              >
                  <div className="message-content">
                      {m.message}
                  </div>
              </div>
          )
        })
    };


    componentDidMount() {
        // const {chat} = this.props;
        // console.log('componentDidMount');
        // socket.emit('GET_ALL_MESSAGES', chat.chatRoom);



        const {socket, chat} = this.props;
        const room = chat.chatRoom._id;



        socket.emit('JOIN_ROOM', {room}, () => {
            console.log(`user join to room ${room}`);
        });


        socket.on('NEW_SMALL_CHAT_MSG', message => {
            console.log(message);
        })




    }


    render() {
        const {message} = this.state;
        const {chat} = this.props;

        return (
            <div className="floated-chat-w active">
                <div className="floated-chat-i">
                    <div className="chat-close">
                        <i className="zmdi zmdi-close"
                           onClick={this.props.closeSmallchat}
                        />
                    </div>
                    <div className="chat-head">
                        <div className="user-w with-status status-green">
                            <div className="user-avatar-w">
                                <div className="user-avatar">
                                    {/*<img alt={user.name} src={image} />*/}
                                </div>
                            </div>
                            <div className="user-name">
                                <h6 className="user-title">

                                    {/*{user.name}*/}
                                </h6>
                                <div className="user-role">
                                    {/*{status}*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-messages ps ps--theme_default" ref={this.messagesContainer}>

                        <div className="date-break">
                            Mon 10:20am
                        </div>
                        <div className="date-break">
                             { (chat && chat.chatRoom ) ? chat.chatRoom._id : null } <br/>
                            { Math.random() * 100 }
                        </div>

                        { this.renderMessages() }

                    </div>

                    <form
                        className="chat-controls"
                        onSubmit={this.sendMessage}
                    >
                        <input
                            autoFocus
                            className="message-input"
                            placeholder="Type your message here..."
                            type="text"
                            value={message}
                            onChange={e => this.setState({message: e.target.value})}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

SmallChatIndex.propTypes = {
    chat: PropTypes.object.isRequired
};





export default SmallChatIndex;