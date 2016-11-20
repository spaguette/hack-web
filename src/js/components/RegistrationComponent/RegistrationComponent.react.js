import React from 'react';
import * as styles from './RegistrationComponent.scss';
import {browserHistory} from 'react-router';
import SessionActions from '../../reflux/actions/SessionActions';
import SessionStore from '../../reflux/stores/SessionStore';
import {TextInput, PasswordInput} from '../Inputs/ValidationInputs/ValidationInputs.react';
import * as audio from '../../utils/mainau';

class RegistrationComponent extends React.PureComponent {
    static displayName = 'RegistrationComponent';

    constructor(props, context) {
        super(props, context);

        this.state = {
            isEmailEmpty: null,
            isPasswordEmpty: null,
            isLicenseEmpty: null,
            savedEmail: SessionStore.enteredEmail || ''
        };
    }

    componentDidMount() {
        SessionStore.addAudioSamplesChangeListener(this.sendAudioSample);
    }

    sendAudioSample = () => {
        if (SessionStore.audioSamples !== null) {
            SessionActions.registerAudioSample(this.refs.emailInput.refs.input.value, SessionStore.audioSamples);
        }
    };

    componentWillUnmount() {
        SessionStore.removeAudioSamplesChangeListener(this.sendAudioSample);
    }

    validate = (name, event) => {
        const value = event.target.value;
        switch (name) {
            case 'login':
                break;
            case 'password':
                break;
            case 'license':
                break;
            default:
                break;
        }
    };

    register = (event) => {
        event.preventDefault();
        SessionActions.registerAudioSample();
        // const loginValue = this.refs.emailInput.refs.input.value;
        // let isEmailEmpty = false;
        //
        // if (!loginValue || loginValue.trim() === '') {
        //     isEmailEmpty = true;
        // }
        // if (!isEmailEmpty) {
        //     SessionActions.register({
        //         email: this.refs.emailInput.refs.input.value
        //     });
        // } else {
        //     console.error('Please fill all fields to register');
        //     this.setState({isEmailEmpty});
        // }
    };

    onKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.register();
        }
    };

    render() {
        const {isEmailEmpty, savedEmail} = this.state;
        return (
            <div onKeyDown={this.onKeyDown}>
                <form action="" onSubmit={this.register}>
                    <TextInput
                        label="Email"
                        type="email"
                        required={true}
                        labelClassName={styles.caption}
                        ref="emailInput"
                        value={savedEmail}
                    />
                    <div className="controls">
                        <span>0123456789</span>
                        <div
                            className="record"
                            onClick={(event) => {audio.toggleRecording(event, '0123456789');}}
                        >
                            Записать
                        </div>
                    </div>
                    <div className="controls">
                        <span>9876543210</span>
                        <div
                            className="record"
                            onClick={(event) => {audio.toggleRecording(event, '9876543210');}}
                        >
                            Записать
                        </div>
                    </div>
                    <div className="controls">
                        <span>4958672013</span>
                        <div
                            className="record"
                            onClick={(event) => {audio.toggleRecording(event, '4958672013');}}
                        >
                            Записать
                        </div>
                    </div>
                    <input type="submit" value="Зарегистрироваться" className={styles.registrationButton} />
                </form>
                <div className={styles.loginButtonLink} onClick={() => {
                    browserHistory.push('/login');
                }}
                >
                    Войти
                </div>
            </div>
        );
    }
}

export default RegistrationComponent;