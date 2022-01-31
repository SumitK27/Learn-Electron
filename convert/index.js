const { app, BrowserWindow } = require("electron");

let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            backgroundThrottling: false,
        },
        width: 800,
        height: 600,
    });

    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});
