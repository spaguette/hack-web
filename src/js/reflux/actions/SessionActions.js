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

    //ПОПЫТКА СДЕЛАТЬ ПОЛУЧЕНИЕ ТОКЕНА ЯНДЕКС-КОШЕЛЬКА
    getYandexToken: (email) => {
        // window.location = 'https://oauth.vk.com/authorize?client_id=5737607&display=page&response_type=token&redirect_uri=https://oauth.vk.com/blank.html&scope=2';
        // window.location = 'https://sp-money.yandex.ru/oauth/authorize?client_id=57DCAFF3AC9CFEFEF4DA51501BCA28BD765C6F94B1D106225E51B2CBD276A2D5&response_type=code&redirect_uri=https://5.189.103.129:8001&scope=account_info';
        // axios.get(`/oauth/authorize?client_id=57DCAFF3AC9CFEFEF4DA51501BCA28BD765C6F94B1D106225E51B2CBD276A2D5&response_type=code&redirect_uri=https://5.189.103.129:8001&scope=account_info`
        // axios.get(`/oauth/authorize?client_id=57DCAFF3AC9CFEFEF4DA51501BCA28BD765C6F94B1D106225E51B2CBD276A2D5&response_type=code&scope=operation-history%20account-info&redirect_uri=http%3A%2F%2Fzenmoney.ru%2Fcallback%2Fyandex%2F%3Fconnection%3D128230`
        // axios.get(`/authorize?client_id=5737607&display=page&response_type=token&redirect_uri=https://oauth.vk.com/blank.html&scope=2`
        //     /* , {
        //      headers: {
        //      'content-type': 'application/x-www-form-urlencoded'
        //      }
        //      }*/)
        //      .then((response) => {
        //          console.log('success');
        //      })
        //      .catch((response) => {
        //          //notify user about an error
        //          console.error('Error while receiving response = ', response.data);
        //      });
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

    registerAudioSample: (email, voiceSample) => {
        axios.post('/api/Auth/addVoiceModel', {email: email, voiceSample: voiceSample})
             .then((response) => {
                 SessionStore.setNextVoiceEntry(response.data.password);
                 SessionStore.setNeededEntriesCount(response.data.count);
             })
             .catch((response) => {
                 //notify user about an error
                 SessionStore.rejectVoiceSample();
                 console.error('Error while receiving response = ', response.data);
             });
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
