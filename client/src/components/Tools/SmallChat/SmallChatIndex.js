import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SmallChatIndex extends Component {
    render() {
        // const {showSmallChat} = this.props;
        // const {status, user, image} = this.props.profile;

        return (
            <div className="floated-chat-w active">
                <div className="floated-chat-i">
                    <div className="chat-close">
                        <i className="zmdi zmdi-close" />
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
                    <div className="chat-messages ps ps--theme_default">
                        <div className="date-break">
                            Mon 10:20am
                        </div>
                        <div className="message">
                            <div className="message-content">
                                Hi, my name is Mike, I will be happy to assist you
                            </div>
                        </div>
                        <div className="message self">
                            <div className="message-content">
                                Hi, I tried ordering this product and it keeps showing me error code.
                            </div>
                        </div>

                        <div className="date-break">
                            Mon 10:20am
                        </div>
                        <div className="message">
                            <div className="message-content">
                                Hi, my name is Mike, I will be happy to assist you
                            </div>
                        </div>
                        <div className="message self">
                            <div className="message-content">
                                Hi, I tried ordering this product and it keeps showing me error code.
                            </div>
                        </div>

                        <div className="date-break">
                            Mon 10:20am
                        </div>
                        <div className="message">
                            <div className="message-content">
                                Hi, my name is Mike, I will be happy to assist you
                            </div>
                        </div>
                        <div className="message self">
                            <div className="message-content">
                                Hi, I tried ordering this product and it keeps showing me error code.
                            </div>
                        </div>

                        <div className="date-break">
                            Mon 10:20am
                        </div>
                        <div className="message">
                            <div className="message-content">
                                Hi, my name is Mike, I will be happy to assist you
                            </div>
                        </div>
                        <div className="message self">
                            <div className="message-content">
                                Hi, I tried ordering this product and it keeps showing me error code.
                            </div>
                        </div>

                        <div className="date-break">
                            Mon 10:20am
                        </div>
                        <div className="message">
                            <div className="message-content">
                                Hi, my name is Mike, I will be happy to assist you
                            </div>
                        </div>
                        <div className="message self">
                            <div className="message-content">
                                Hi, I tried ordering this product and it keeps showing me error code.
                            </div>
                        </div>

                        <div className="date-break">
                            Mon 10:20am
                        </div>
                        <div className="message">
                            <div className="message-content">
                                Hi, my name is Mike, I will be happy to assist you
                            </div>
                        </div>
                        <div className="message self">
                            <div className="message-content">
                                Hi, I tried ordering this product and it keeps showing me error code.
                            </div>
                        </div>

                        <div className="date-break">
                            Mon 10:20am
                        </div>
                        <div className="message">
                            <div className="message-content">
                                Hi, my name is Mike, I will be happy to assist you
                            </div>
                        </div>
                        <div className="message self">
                            <div className="message-content">
                                Hi, I tried ordering this product and it keeps showing me error code.
                            </div>
                        </div>
                    </div>
                    <div className="chat-controls">
                        <input className="message-input" placeholder="Type your message here..." type="text" />
                    </div>
                </div>
            </div>
        );
    }
}

SmallChatIndex.propTypes = {
    profile: PropTypes.object.isRequired,
};





export default SmallChatIndex;