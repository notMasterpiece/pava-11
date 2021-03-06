import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import io from 'socket.io-client';

let socket,
    popup;

class Social extends Component {

    state = {
        user: {},
        disabled: ''
    };


    checkPopup() {
        const check = setInterval(() => {
            const {popup} = this;
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check);
                this.setState({disabled: ''})
            }
        }, 1000)
    }

    openPopup = provider => {

        const width = 600, height = 600;
        const left = (window.innerWidth / 2) - (width / 2);
        const top = (window.innerHeight / 2) - (height / 2);
        const url = `https://${window.location.hostname}/api/auth/${provider}?socketId=${socket.id}`;

        console.log(window.location.hostname, 'hostname');
        console.log(url, 'url');

        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no,
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
        )
    };


    startAuth = provider => {
        if (!this.state.disabled) {
            popup = this.openPopup(provider);
            this.checkPopup();
            this.setState({disabled: 'disabled'})
        }
    };

    socketCallback = token => {
        popup.close();
        this.props.loginSocial(token);
    };


    componentDidMount() {

        const socketUrl = window.location.origin;
        socket = io.connect(socketUrl);

        socket.on('google', token => {
            this.socketCallback(token)
        });
        socket.on('facebook', token => {
            this.socketCallback(token)
        });
        socket.on('github', token => {
            this.socketCallback(token)
        });
        socket.on('linkedin', token => {
            this.socketCallback(token)
        });
    }


    componentWillUnmount() {
        socket.disconnect();
    }


    render() {
        const {provider} = this.props;

        return (
            <Button onClick={() => this.startAuth(provider)} >
                {provider}
            </Button>
        );
    }
}

const Button = styled.button`
  display: block;
  border: 0;
  padding: 10px 20px;
  margin: 5px;
  width: 46%;
  text-transform: uppercase;
  cursor: pointer;
  background-color: #eee;
`;

Social.propTypes = {
    provider: PropTypes.string.isRequired,
};

export default Social;