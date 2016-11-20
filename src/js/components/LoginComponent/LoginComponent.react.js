import React from 'react';
import * as styles from './LoginComponent.scss';
import SessionActions from '../../reflux/actions/SessionActions';
import SessionStore from '../../reflux/stores/SessionStore';
import NotificationsStore from '../../reflux/stores/NotificationsStore';
import {browserHistory} from 'react-router';
import NotificationSystem from 'react-notification-system';
import * as audio from '../../utils/mainau';

class LoginComponent extends React.PureComponent {
    static displayName = 'LoginComponent';
    _notificationSystem = null;

    _addNotification = () => {
        this._notificationSystem.addNotification(NotificationsStore.notification);
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            emailExists: SessionStore.emailExists
        };
    }

    componentDidMount() {
        this.refs.emailInput.value = SessionStore.enteredEmail;
        this._notificationSystem = this.refs.notificationSystem;
        SessionStore.addEmailStatusChangeListener(this.toggleRegistrationForm);
        NotificationsStore.addNotificationChangeListener(this._addNotification);
    }

    componentWillUnmount() {
        SessionStore.removeEmailStatusChangeListener(this.toggleRegistrationForm);
        NotificationsStore.removeNotificationChangeListener(this._addNotification);
    }

    toggleRegistrationForm = () => {
        if (SessionStore.emailExists === false) { //если email не зарегистрирован - нужно регистрироваться
            browserHistory.push('/registration');
        } else {
            this.setState({emailExists: SessionStore.emailExists});
        }
    };

    enterApp = (event) => {
        event.stopPropagation();
        event.preventDefault();
        SessionActions.doesEmailExist(this.refs.emailInput.value.toString());
        // SessionActions.logIn({
        //     email: this.refs.emailInput.value,
        //     password: this.refs.passwordInput.value
        // });
    };

    onKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.enterApp();
        }
    };

    render() {
        const {emailExists} = this.state;
        let formClassName, submitButtonText;
        if (!emailExists) { //email еще не отправляли на сервер или он не зарегистрирован
            formClassName = styles.hidden;
            submitButtonText = 'Далее';
        } else if (emailExists === true) { //email зарегистрирован
            formClassName = styles.authForm;
            submitButtonText = 'Войти';
        }

        return (
            <div className={styles.loginForm} onKeyDown={this.onKeyDown}>
                <NotificationSystem ref="notificationSystem" />
                <h1 className={styles.loginCaption}>Вход в приложение</h1>
                <form action="" onSubmit={this.enterApp}>
                    <div>
                        <label htmlFor="login-email-input-field" className={styles.caption}><p>E-mail</p></label>
                        <input id="login-email-input-field" type="email" ref="emailInput" required />
                    </div>
                    <div className={formClassName}>
                        <div id="controls">
                            <div
                                id="record"
                                onClick={(event) => {audio.toggleRecording(event, '0123456789');}}
                            >
                                Записать
                            </div>
                            <a id="save">save</a>
                        </div>
                    </div>
                    <input value={submitButtonText} className={styles.nextButton} type="submit" />
                </form>
            </div>
        );
    }
}

export default LoginComponent;
