import EventEmitter from 'events';
import assign from 'object-assign';
var AUDIO_CHANGE = 'AUDIO_CHANGE';
var EMAIL_STATUS_CHANGE = 'EMAIL_STATUS_CHANGE';

const SessionStore = assign({}, EventEmitter.prototype, {
    audioSamples: null,
    emailExists: null,
    enteredEmail: null,

    emitAudioSamplesChange: function () {
        this.emit(AUDIO_CHANGE);
    },

    emitEmailStatusChange: function () {
        this.emit(EMAIL_STATUS_CHANGE);
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
    addEmailStatusChangeListener: function (callback) {
        this.on(EMAIL_STATUS_CHANGE, callback);
    },

    addBlob: function (msg, blob) {
        if (!this.audioSamples) { this.audioSamples = {}; }
        this.audioSamples.msg = blob;
        this.emitAudioSamplesChange();
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
    removeEmailStatusChangeListener: function (callback) {
        this.removeListener(EMAIL_STATUS_CHANGE, callback);
    }
});

export default SessionStore;