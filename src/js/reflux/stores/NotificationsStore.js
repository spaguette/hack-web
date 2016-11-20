import EventEmitter from 'events';
import assign from 'object-assign';
var NOTIFICATION_CHANGE = 'NOTIFICATION_CHANGE';

const NotificationsStore = assign({}, EventEmitter.prototype, {
    notification: null,

    emitNotificationChange: function () {
        this.emit(NOTIFICATION_CHANGE);
    },

    /**
     * @param {function} callback
     */
    addNotificationChangeListener: function (callback) {
        this.on(NOTIFICATION_CHANGE, callback);
    },

    replaceNotification: function (message, level) {
        if (!this.audioSamples) { this.notification = {}; }
        this.notification = {message, level};
        this.emitNotificationChange();
    },

    /**
     * @param {function} callback
     */
    removeNotificationChangeListener: function (callback) {
        this.removeListener(NOTIFICATION_CHANGE, callback);
    }
});

export default NotificationsStore;
