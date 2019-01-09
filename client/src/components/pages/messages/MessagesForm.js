import React from 'react';
import PropTypes from 'prop-types';

const MessagesForm = ({message, onChange, sendMessage}) => {
    return (
        <div className="chat-message clearfix">
            <form className="input-group mb-0 " onSubmit={e => sendMessage(e)}>
                <input
                    type="text"
                    className="form-control datetimepicker"
                    placeholder="Введіть повідомлення..."
                    name={'message'}
                    value={message}
                    onChange={onChange}
                />
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