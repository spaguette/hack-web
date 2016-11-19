import React from 'react';
import * as styles from './LoginComponent.scss';
import SessionActions from '../../reflux/actions/SessionActions';
import SessionStore from '../../reflux/stores/SessionStore';
import {browserHistory} from 'react-router';
import * as audio from './mainau';

class LoginComponent extends React.PureComponent {
    static displayName = 'LoginComponent';

    constructor(props, context) {
        super(props, context);

        this.state = {
            emailExists: SessionStore.emailExists
        };
    }

    componentDidMount() {
        SessionStore.addEmailStatusChangeListener(this.toggleRegistrationForm);
        this.refs.emailInput.value = SessionStore.enteredEmail;
    }

    componentWillUnmount() {
        SessionStore.removeEmailStatusChangeListener(this.toggleRegistrationForm);
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
                <h1 className={styles.loginCaption}>Вход в приложение</h1>
                <form action="" onSubmit={this.enterApp}>
                    <div>
                        <label htmlFor="login-email-input-field" className={styles.caption}><p>E-mail</p></label>
                        <input id="login-email-input-field" type="email" ref="emailInput" />
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
