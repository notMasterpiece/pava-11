import React from 'react';
import PropTypes from 'prop-types';

import smile from '../../../assets/images/smile.svg';

const MessagesForm = ({message, onChange, sendMessage, onKeyUp, typing}) => {
    return (
        <div className="chat-message clearfix">
            {typing &&
            <div className="typing-indicator">
                <div>Jony typing</div>
                <span/><span/><span/>
            </div>
            }
            <form className="input-group mb-0 " onSubmit={e => sendMessage(e)}>
                <input
                    autoComplete="off"
                    autoFocus={true}
                    type="text"
                    className="form-control"
                    placeholder="Введіть повідомлення..."
                    name={'message'}
                    value={message}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                />
                <button>
                    <img src={smile} alt='emoji'/>
                </button>
                <button type={'submit'} className="input-group-append">
                    <span className="input-group-text"><i className="zmdi zmdi-mail-send"/></span>
                </button>
            </form>
        </div>
    );
};

MessagesForm.propTypes = {
    message: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default MessagesForm;