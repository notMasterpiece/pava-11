import axios from 'axios';

export const pushNotification = (data) => {
    const config = { headers: {"content-type": "application/json"}};
    axios
        .post(`/api/notification`, data, config)
        .catch(err => {
            console.log('catch push error', err);
        })
};