import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Emoji = ({sendEmoji}) => {
    return (
        <EmojiWrap>
            <ul>
                <EmojiWrapLi
                    onClick={() => sendEmoji('smile')}
                    key={Math.random()}
                >
                    <img
                        src="https://az705183.vo.msecnd.net/onlinesupportmedia/onlinesupport/media/skype/fa100xx/smile_40x40.gif" alt=""/>
                </EmojiWrapLi>
                <EmojiWrapLi
                    key='sad'
                >
                    <img
                        src="https://az705183.vo.msecnd.net/onlinesupportmedia/onlinesupport/media/skype/fa100xx/sad_40x40_1.gif"
                        alt=""/>
                </EmojiWrapLi>
                <EmojiWrapLi
                    key='facepalm'
                >
                    <img
                        src="https://az705183.vo.msecnd.net/onlinesupportmedia/onlinesupport/media/skype/fa300xx/facepalm_40x40.gif"
                        alt=""/>
                </EmojiWrapLi>
                <EmojiWrapLi
                    key='laugh'
                >
                    <img
                        src="https://az705183.vo.msecnd.net/onlinesupportmedia/onlinesupport/media/skype/fa100xx/laugh_40x40.gif"
                        alt=""/>
                </EmojiWrapLi>
                <EmojiWrapLi
                    key='like'
                >
                    <img
                        src="https://az705183.vo.msecnd.net/onlinesupportmedia/onlinesupport/media/skype/fa300xx/like_40x40.gif"
                        alt=""/>
                </EmojiWrapLi>
                <EmojiWrapLi
                    key='xd'
                >
                    <img
                        src="https://az705183.vo.msecnd.net/onlinesupportmedia/onlinesupport/media/skype/fa300xx/xd_40x40.gif"
                        alt=""/>
                </EmojiWrapLi>
            </ul>
        </EmojiWrap>
    )
};


const EmojiWrap = styled.div`
    position: absolute;
    width: 300px;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 1px 10px rgba(0,0,0,.35);
    left: 40%;
    bottom: 65px;
    background: #fff;
    z-index: 1;
    padding: 10px; 
`;


const EmojiWrapLi = styled.div`
  padding: 0 3px; 
  display: inline-block;
`;

Emoji.propTypes = {};

export default Emoji;