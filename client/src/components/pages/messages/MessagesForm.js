import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import smile from '../../../assets/images/smile.svg';
import like from '../../../assets/images/like.svg';

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
                <AddLike>
                    <img src={like} alt=""/>
                </AddLike>
                <AddEmojiBtn
                    className='add_emoji'
                >
                    <img src={smile} alt='emoji'/>
                </AddEmojiBtn>
                <button type={'submit'} className="input-group-append">
                    <span className="input-group-text"><i className="zmdi zmdi-mail-send"/></span>
                </button>
            </form>
        </div>
    );
};



const AddEmojiBtn = styled.button` 
  position: absolute;
  top: 1px;
  bottom: 1px;
  right: 40px;
  width: 50px;
  border: 0;
  cursor: pointer; 
  img {
    width: 20px;
    height: 20px;
  }
`;

const AddLike = styled.button` 
  position: absolute;
  top: 1px;
  bottom: 1px;
  right: 80px;
  width: 50px;
  border: 0;
  cursor: pointer; 
  img {
    width: 20px;
    height: 20px;
  }
`;

MessagesForm.propTypes = {
    message: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default MessagesForm;