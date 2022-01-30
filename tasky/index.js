const { app, BrowserWindow } = require("electron");

let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        width: 300,
        height: 500,
        frame: false,
        resizable: false,
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});
