class WidgetSettings {

    constructor() {
        this.ws = {
            settings: {
                header_online: 'chat'
            }
        };
    }

    setSettings(data) {
        this.ws = data;
    }

    getSettings() {
        return this.ws.settings;
    }

}

export default new WidgetSettings()