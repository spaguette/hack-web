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
            voiceEntry: SessionStore.nextVoiceEntry,
            voiceRejected: SessionStore.isVoiceSampleRejected,
            readyToRegister: SessionStore.isReadyToRegister,
            savedEmail: SessionStore.enteredEmail || '',
            counter: SessionStore.counter
        };
    }

    componentDidMount() {
        SessionStore.addAudioSamplesChangeListener(this.sendAudioSample);
        SessionStore.addNextVoiceEntryChangeListener(this.setNextVoiceEntry);
        SessionStore.addReadyToRegisterChangeListener(this.setReadyToRegisterStatus);
        SessionStore.addVoiceSampleRejectedChangeListener(this.forceUserToRecordAgain);
        SessionStore.addCounterChangeListener(this.updateCounter);
        // SessionStore.addAudioSamplesChangeListener(this.sendAudioSample);
    }

    sendAudioSample = () => {
        if (SessionStore.audioSamples !== null) {
            SessionActions.registerAudioSample(this.refs.emailInput.refs.input.value, SessionStore.audioSamples);
        }
    };

    setReadyToRegisterStatus = () => {
        this.setState({readyToRegister: SessionStore.isReadyToRegister});
    };

    setNextVoiceEntry = () => {
        this.setState({voiceEntry: SessionStore.nextVoiceEntry});
    };

    forceUserToRecordAgain = () => {
        this.setState({voiceRejected: SessionStore.isVoiceSampleRejected});
    };

    updateCounter = () => {
        this.setState({counter: SessionStore.counter});
    };

    componentWillUnmount() {
        SessionStore.removeAudioSamplesChangeListener(this.sendAudioSample);
        SessionStore.removeNextVoiceEntryChangeListener(this.setNextVoiceEntry);
        SessionStore.removeReadyToRegisterChangeListener(this.setReadyToRegisterStatus);
        SessionStore.removeVoiceSampleRejectedChangeListener(this.forceUserToRecordAgain);
        SessionStore.removeCounterChangeListener(this.updateCounter);
        // SessionStore.removeAudioSamplesChangeListener(this.sendAudioSample);
    }

    register = (event) => {
        event.preventDefault();
        browserHistory.push('/account');
    };

    onKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.register(event);
        }
    };

    render() {
        const {isEmailEmpty, savedEmail, voiceEntry, voiceRejected, readyToRegister, counter} = this.state;
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
                        <span className={styles.voiceTip}>Скажите {voiceEntry}</span>
                        <div
                            className="record"
                            onClick={(event) => {audio.toggleRecording(event, voiceEntry);}}
                        >
                            Записать
                        </div>
                    </div>
                    {voiceRejected ? <div className={styles.errorMessage}>Необходимо перезаписать</div> : null}
                    {counter ? <div className={styles.message}>Осталось записать {counter} сэмплов</div> : null}
                    <input
                        disabled={!readyToRegister}
                        type="submit"
                        value="Зарегистрироваться"
                        className={styles.registrationButton}
                    />
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