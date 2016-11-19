import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, IndexRoute, browserHistory, Redirect} from 'react-router';
import LoginComponent from './components/LoginComponent/LoginComponent.react.js';
import RegistrationComponent from './components/RegistrationComponent/RegistrationComponent.react.js';
import MainComponent from './components/MainComponent/MainComponent.react.js';
import axios from 'axios';

/**
 * RedirectFunction (ReactRouter v1.0)
 * @typedef {Function} RedirectFunction
 * @param {Object | String} LocationDescriptor
 * @return {void}
 */
/** Функция для проверки авторизации пользователя
 * @function
 * @param {Object} nextState - RouterState - задается ReactRouter-ом
 * @param {RedirectFunction} redirectTo
 * @param {Function} callback
 * @return {void}
 * */
function requireAuth(nextState, redirectTo, callback) {
    axios.get('/api/session')
        .then(function (response) {
            setTimeout(() => {
                console.info('User authorized, page rendered');
                callback();
            }, 0);
        })
        .catch(function (response) {
            if (response instanceof Error) {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', response.message);
            } else {
                // The request was made, but the server responded with a status code
                // that falls out of the range of 2xx
                if (response.status === 401) {
                    console.error('User not authorized, please login');
                } else if (response.status >= 500 && response.status <= 599) {
                    console.error('Server Error!');
                } else {
                    console.error('Unhandled Error!');
                }
                redirectTo('/login');
                callback();
            }
        });
}

const routes = (
    <Router history={browserHistory}>
        <Redirect from="/" to="/login" />
        <Route path="/" component={MainComponent}>
            <Route path="/login" component={LoginComponent} />
            <Route path="/registration" component={RegistrationComponent} />
        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('root'));