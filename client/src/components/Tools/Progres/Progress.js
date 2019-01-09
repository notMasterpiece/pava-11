import React from 'react';
import styled from 'styled-components'
import { doScroll } from '../../../helpers/helpers';

const Proggres = () => {
    return (
        <ProgressWrap>
            <ProgressInner id='progress' />
        </ProgressWrap>
    );
};

export default Proggres;


const ProgressWrap = styled.div`
  width: 100%;
  height: 2px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background: transparent;
`;

const ProgressInner = styled.div`
  height: 2px;
  background-color: #313740;
  width: 0%;   
`;


window.onload = () => {
    window.onscroll = () => {
        doScroll();
    }
};
