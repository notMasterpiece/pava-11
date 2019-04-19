import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import icons from './list';

const Emoji = ({sendEmoji}) => {

    return (
        <EmojiWrap>
            <ul>

                {
                    icons.map(i => (
                        <EmojiWrapLi
                            onClick={() => sendEmoji(i.id)}
                            key={i.id}
                        >
                            <img
                                src={`${window.location.origin}/files/emoji/${i.id}.gif`} alt={i.id}/>
                        </EmojiWrapLi>
                    ))
                }
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
    left: 20%;
    bottom: 65px;
    background: #fff;
    z-index: 1;
    padding: 10px; 
    text-align: center;
`;


const EmojiWrapLi = styled.div`
  padding: 7px; 
  display: inline-block;
  cursor: pointer;
`;

Emoji.propTypes = {};

export default Emoji;