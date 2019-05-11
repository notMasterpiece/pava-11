import axios from 'axios';
import React from "react";
import './helpers.scss';

export const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    ( typeof value === 'object' && Object.keys(value).length === 0 ) ||
    ( typeof value === 'string' && value.trim().length === 0 )
  )
};



export const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};


export const doScroll = () => {
    let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (windowScroll / documentHeight) * 100;
    let progress = document.getElementById('progress');

    if( progress ) progress.style.width = `${scrolled.toFixed()}%`;
};


export const bytesToSize = bytes => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};



export const urlBase64ToUint8Array = base64String => {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


export const getCoords = elem =>  {

    let box = elem.getBoundingClientRect();

    let body = document.body;
    let docEl = document.documentElement;

    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    let clientTop = docEl.clientTop || body.clientTop || 0;
    let clientLeft = docEl.clientLeft || body.clientLeft || 0;

    let top = box.top + scrollTop - clientTop;
    let left = box.left + scrollLeft - clientLeft;

    return {
        top: top,
        left: left
    };
};



export const arrayRange = (start, end) => {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
};



export const gotoBottom = selector => {
    selector.scrollTop = selector.scrollHeight - selector.clientHeight;
};

export const smoothScroll = selector => {
    let i = selector.scrollTop;
    let int = setInterval(function() {
        selector.scrollTop = i;
        i += 16;
        if (i >= selector.scrollHeight) clearInterval(int);
    }, 16);
};

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};


export const renderProvider = provider => {
    switch (provider) {
        case 'facebook':
            return <i title={`login by ${provider}`} className="zmdi zmdi-facebook"/>;
        case 'google':
            return <i title={`login by ${provider}`} className="zmdi zmdi-google"/>;
        case 'github':
            return <i title={`login by ${provider}`} className="zmdi zmdi-github-alt"/>;
        case 'linkedin':
            return <i title={`login by ${provider}`} className="zmdi zmdi-linkedin"/>;
        default:
            return null;
    }
};
