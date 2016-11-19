import React from 'react';
import * as styles from './LoginComponent.scss';
import SessionActions from '../../reflux/actions/SessionActions';
import {browserHistory} from 'react-router';

class LoginComponent extends React.Component {
    static displayName = 'LoginComponent';

    constructor(props, context) {
        super(props, context);
    }

    login = () => {
        SessionActions.logIn({
            username: this.refs.loginInput.value,
            password: this.refs.passwordInput.value
        });
    };

    onKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.login();
        }
    };

    render() {
        return (
            <div className={styles.loginForm} onKeyDown={this.onKeyDown}>
                <div>
                    <label htmlFor="login-username-input-field" className={styles.caption}><p>Логин</p></label>
                    <input id="login-username-input-field" type="text" ref="loginInput" />
                </div>
                <div>
                    <label htmlFor="login-password-input-field" className={styles.caption}><p>Пароль</p></label>
                    <input id="login-password-input-field" type="password" ref="passwordInput" />
                </div>
                <div className={styles.loginButton} onClick={this.login}>
                    Войти
                </div>
                <div className={styles.registrationButtonLink} onClick={() => {
                    browserHistory.push('/registration');
                }}
                >
                    Создать аккаунт
                </div>
            </div>
        );
    }
}

export default LoginComponent;
