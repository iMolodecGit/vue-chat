import io from 'socket.io-client'
import LocalStorage from './LocalStorage.js'
import WidgetSettings from './../models/WidgetSettings'
import UserInfo from './../models/UserInfo'

import notice from './../helpers/notice'

let settings = {
    debug: true
};

class Chat {

    constructor() {
        this.transport = null;
        this.connectionData = null;
        this.widgetId = null;
        this.localeId = null;
        this.isLoaded = false;
    }

    connect(connectionData) {

        this.widgetId = connectionData.widget_id;
        this.localeId = connectionData.locale_id;
        this.connectionData = connectionData;
        this.connectionData.session_id =  LocalStorage.get('sessionid-' + this.connectionData.widget_id);
        //     navigator: jscd,
        //     user_info: user_info
        this.connectionData.current_page = window.location.href;
        this.connectionData.new_visitor = false;

        this.transport = io("http://localhost:48689");

        this.transport.on('connect', () => {
            if (settings.debug) {
                console.info('ON:', 'connect')
            }

            this.transport.send(this.connectionData);
            if (settings.debug) {
                console.info('SEND:', this.connectionData);
            }

        });

        this.setListeners();

    }

    on(event, callback) {
        this.transport.on(event, (data) => {
            if (settings.debug) {
                console.info('ON:', event, data);
            }
            callback(data);
        });
    }

    emit (event, data) {
        if (settings.debug) {
            console.info('EMIT:', event, data);
        }
        this.transport.emit(event, data);
    }

    setListeners() {
        this.transport.on('main:error', function (data) {
            if (settings.debug) {
                console.warn('ERROR:', data);
            }
        });

        this.on('p', (data) => {
            if (settings.debug) {
                console.info('p data', data)
            }
        });

        this.on('client:info', (data) => {

        });

        this.on('storage', (data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].name === 'sessionid') {
                    data[i].name += '-' + this.widgetId;
                }
                LocalStorage.set(data[i].name, data[i].value);
            }
        });

        this.on('connected', (data) => {
            if (data) {
                UserInfo.setInfo(data);
            }

            if (!this.isLoaded) {
                let emitData = {
                    widget_id: this.widgetId,
                    locale: this.localeId ? this.localeId : null
                };

                this.emit('client:widget.get', emitData);
            }

            this.isLoaded = true;
        });

        this.on('client:widget.init', (data) => {

            WidgetSettings.setSettings(data);

            notice.$emit('widget-settings', {});
        });

    }

    getUserInfoBeforeOpen () {
        this.emit('main:user.info');
    };

    getWidget(data) {
        this.emit('client:widget.get', data);
    }

}

export default new Chat();