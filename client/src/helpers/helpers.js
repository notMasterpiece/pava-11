import axios from 'axios';


export const setAuthToken = token => {
  if(token) {
    // Apply to all request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete
    delete axios.defaults.headers.common['Authorization'];
  }
};

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




