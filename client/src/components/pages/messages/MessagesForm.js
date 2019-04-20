import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import smile from '../../../assets/images/smile.svg';
import image from '../../../assets/images/image.svg';

const MessagesForm = ({message, onChange, sendMessage, onKeyUp, typing, renderEmoji}) => {
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
                <AddImageBtn
                >
                    <img src={image} alt=""/>
                    <input type="file"/>
                </AddImageBtn>
                <AddEmojiBtn
                    className='add_emoji'
                    onClick={renderEmoji}
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

const AddImageBtn = styled.button` 
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