import axios from 'axios';
import {browserHistory} from 'react-router';
import SessionStore from '../stores/SessionStore';
import NotificationsStore from '../stores/NotificationsStore';

const SessionActions = {
    /**
     * @function doesEmailExist
     * @param {String} email
     * @return {void}
     * */
    doesEmailExist: (email) => {
        SessionStore.setEnteredEmail(email);
        axios.post('/api/Auth/startSession', {email: email})
             .then((response) => {
                 SessionStore.changeEmailStatus(true);
                 console.info('user exists, go to biometric identification');
                 //use token here
             })
             .catch((response) => {
                 //notify user about an error
                 if (response.status === 400) {
                     SessionStore.changeEmailStatus(false);
                     console.info('No such email, should register', response.data);
                 } else {
                     SessionStore.changeEmailStatus(false); //заглушка
                     NotificationsStore.replaceNotification('Внутренняя ошибка сервера', 'error');
                     console.error('Error while checking email = ', response.data);
                 }
             });
    },
    /**
     * @function doesEmailExist
     * @param {String} msg
     * @param {Blob} blob
     * @return {void}
     * */
    writeBlob: (msg, blob) => {
        SessionStore.addBlob(msg, blob);
    },
    /**
     * @function logIn
     * @param {Object} authInfo
     * @return {void}
     * */
    logIn: (authInfo) => {
        axios.post('/api/session', {username: authInfo.username, password: authInfo.password})
             .then((response) => {
                 browserHistory.push('/reservation');
             })
             .catch((response) => {
                 //notify user about an error
                 console.error('Error while receiving response = ', response.data);
             });
    },
    /**
     * @function register
     * @param {Object} regInfo
     * @return {void}
     * */
    register: (regInfo) => {
        axios.post('/api/registration', {
            username: regInfo.username,
            password: regInfo.password,
            licensePlate: regInfo.licensePlate
        })
             .then((response) => {
                 browserHistory.push('/reservation');
             })
             .catch((response) => {
                 //notify user about an error
                 console.error('Error while receiving response = ', response.data);
             });
    }
};

export default SessionActions;
