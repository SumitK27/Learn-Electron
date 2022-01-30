const path = require("path");
const { app, BrowserWindow } = require("electron");
const TimerTray = require("./app/TimerTray");

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
        show: false,
        skipTaskbar: true,
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    const iconName =
        process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

    // Creating TimerTray
    new TimerTray(iconPath, mainWindow);
});
