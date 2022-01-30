const path = require("path");
const { app } = require("electron");
const TimerTray = require("./app/TimerTray");
const MainWindow = require("./app/MainWindow");

let mainWindow;
let tray;

app.on("ready", () => {
    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

    const iconName =
        process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

    // Creating TimerTray
    tray = new TimerTray(iconPath, mainWindow);
});
