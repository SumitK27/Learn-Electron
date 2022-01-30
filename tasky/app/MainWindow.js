const { BrowserWindow } = require("electron");

class MainWindow extends BrowserWindow {
    constructor() {
        super({
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
            width: 300,
            height: 500,
            frame: false,
            resizable: false,
            show: false,
            skipTaskbar: true,
        });

        this.on("blur", this.onBlur.bind(this));
    }

    onBlur() {
        this.hide();
    }
}

module.exports = MainWindow;
