import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class MessagesList extends Component {

    render() {

        const {messages} = this.props;
        console.log(messages[0]);

        return (
            <div className="chat-history clearfix">
                <ul className="">
                    {
                        messages.map(m => {
                            return (
                                <li className="clearfix" key={m.date}>
                                    <div className="message-data text-right">
                                        <span className="message-data-time">{moment(m.date).fromNow()}</span>
                                        <span className="message-data-name">{m.userName}</span>
                                            <i className="zmdi zmdi-circle me" />
                                        </div>
                                    <div className="message text-right other-message float-right">
                                        {m.message} <br/>
                                        sender-{m.sender.name} <br/>
                                        receiver-{m.receiver.name}
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        );
    }
}

MessagesList.propTypes = {
    messages: PropTypes.array,
};

export default MessagesList;