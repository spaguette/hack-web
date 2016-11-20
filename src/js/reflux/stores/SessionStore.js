import EventEmitter from 'events';
import assign from 'object-assign';
var AUDIO_CHANGE = 'AUDIO_CHANGE';
var EMAIL_STATUS_CHANGE = 'EMAIL_STATUS_CHANGE';
var READY_TO_REGISTER_CHANGE = 'READY_TO_REGISTER_CHANGE';
var NEXT_VOICE_ENTRY_CHANGE = 'NEXT_VOICE_ENTRY_CHANGE';
var IS_VOICE_SAMPLE_REJECTED_CHANGE = 'IS_VOICE_SAMPLE_REJECTED_CHANGE';

const SessionStore = assign({}, EventEmitter.prototype, {
    audioSamples: null,
    emailExists: null,
    enteredEmail: null,
    isVoiceSampleRejected: false,
    nextVoiceEntry: '0123456789',
    isReadyToRegister: false,

    emitAudioSamplesChange: function () {
        this.emit(AUDIO_CHANGE);
    },

    emitReadyToRegisterChange: function () {
        this.emit(READY_TO_REGISTER_CHANGE);
    },

    emitNextVoiceEntryChange: function () {
        this.emit(NEXT_VOICE_ENTRY_CHANGE);
    },

    emitVoiceSampleRejectedChange: function () {
        this.emit(IS_VOICE_SAMPLE_REJECTED_CHANGE);
    },

    /**
     * @param {function} callback
     */
    addAudioSamplesChangeListener: function (callback) {
        this.on(AUDIO_CHANGE, callback);
    },

    /**
     * @param {function} callback
     */
    addReadyToRegisterChangeListener: function (callback) {
        this.on(READY_TO_REGISTER_CHANGE, callback);
    },

    /**
     * @param {function} callback
     */
    addNextVoiceEntryChangeListener: function (callback) {
        this.on(NEXT_VOICE_ENTRY_CHANGE, callback);
    },

    /**
     * @param {function} callback
     */
    addVoiceSampleRejectedChangeListener: function (callback) {
        this.on(IS_VOICE_SAMPLE_REJECTED_CHANGE, callback);
    },

    /**
     * @param {function} callback
     */
    addEmailStatusChangeListener: function (callback) {
        this.on(EMAIL_STATUS_CHANGE, callback);
    },

    addBlob: function (msg, blob) {
        if (!this.audioSamples) { this.audioSamples = {}; }
        this.audioSamples.password = msg;
        var reader = new window.FileReader();
        reader.readAsDataURL(blob);
        let base64data;
        reader.onloadend = () => {
            base64data = reader.result;
            this.audioSamples.data = base64data;
            this.emitAudioSamplesChange();
        };
    },

    rejectVoiceSample: function () {
        this.isVoiceSampleRejected = true;
        this.emitVoiceSampleRejectedChange();
    },

    setNextVoiceEntry: function (entry) {
        this.nextVoiceEntry = entry;
        this.isVoiceSampleRejected = false;
        this.emitVoiceSampleRejectedChange();
        this.emitNextVoiceEntryChange();
    },

    setNeededEntriesCount: function (count) {
        this.neededCount = count;
        if (count <= 0) {
            this.isReadyToRegister = true;
            this.emitReadyToRegisterChange();
        }
    },

    changeEmailStatus(bool) {
        this.emailExists = bool;
        this.emitEmailStatusChange();
    },

    setEnteredEmail(email) {
        this.enteredEmail = email;
    },

    /**
     * @param {function} callback
     */
    removeAudioSamplesChangeListener: function (callback) {
        this.removeListener(AUDIO_CHANGE, callback);
    },

    /**
     * @param {function} callback
     */
    removeNextVoiceEntryChangeListener: function (callback) {
        this.removeListener(NEXT_VOICE_ENTRY_CHANGE, callback);
    },

    /**
     * @param {function} callback
     */
    removeReadyToRegisterChangeListener: function (callback) {
        this.removeListener(READY_TO_REGISTER_CHANGE, callback);
    },

    /**
     * @param {function} callback
     */
    removeVoiceSampleRejectedChangeListener: function (callback) {
        this.removeListener(IS_VOICE_SAMPLE_REJECTED_CHANGE, callback);
    },

    /**
     * @param {function} callback
     */
    removeEmailStatusChangeListener: function (callback) {
        this.removeListener(EMAIL_STATUS_CHANGE, callback);
    }
});

export default SessionStore;