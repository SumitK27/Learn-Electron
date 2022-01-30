const path = require("path");
const { app, BrowserWindow, Tray } = require("electron");

let mainWindow;
let tray;

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

    // Creating Tray
    tray = new Tray(iconPath);

    // Click Event Listener on Tray
    tray.on("click", (event, bounds) => {
        // Click event bounds
        const { x, y } = bounds;

        // Window height and width
        const { height, width } = mainWindow.getBounds();

        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            // Set position of window
            const yPosition = process.platform === "darwin" ? y : y - height;

            mainWindow.setBounds({
                x: Math.floor(x - width / 2),
                y: yPosition,
                width,
                height,
            });

            // Show window
            mainWindow.show();
        }
    });
});
