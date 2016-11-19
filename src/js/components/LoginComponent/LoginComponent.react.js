import React from 'react';
import * as styles from './LoginComponent.scss';
import SessionActions from '../../reflux/actions/SessionActions';
import Recorder from './recorder';
import {browserHistory} from 'react-router';
import * as audio from './mainau';

let recorder, audioContext;

class LoginComponent extends React.Component {
    static displayName = 'LoginComponent';

    constructor(props, context) {
        super(props, context);
    }

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
        return (
            <div className={styles.loginForm} onKeyDown={this.onKeyDown}>
                <h1 className={styles.loginCaption}>Вход в приложение</h1>
                <form action="" onSubmit={this.enterApp}>
                <div>
                    <label htmlFor="login-email-input-field" className={styles.caption}><p>E-mail</p></label>
                    <input id="login-email-input-field" type="email" ref="emailInput" />
                </div>
                    <input value="Далее" className={styles.nextButton} type="submit" />
                </form>
                <div id="viz">
                    <canvas id="analyser"></canvas>
                    <canvas id="wavedisplay"></canvas>
                </div>
                <div id="controls">
                    <img id="record" width="50" onClick={audio.toggleRecording} />
                    <a id="save">save</a>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
