import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class MessagesList extends Component {

    render() {

        const {messages} = this.props;

        return (
            <div className="chat-history clearfix">
                <ul className="">
                    {
                        messages.map(m => {
                            return (
                                <li className="clearfix" key={m.date}>
                                    <div className="message-data text-right"><span
                                        className="message-data-time">{moment(m.date).fromNow()}</span>
                                        <span className="message-data-name">{m.userName}</span>
                                            <i className="zmdi zmdi-circle me" />
                                        </div>
                                    <div className="message text-right other-message float-right">
                                        {m.message}
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