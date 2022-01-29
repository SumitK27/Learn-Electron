const electron = require("electron");
const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile("main.html");

    // Use Menu from the Menu Template
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    // Add Menu to the Application
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300, // set window width in pixel
        height: 200,
        title: "Add New Todo", // set window title
    });

    addWindow.loadFile("add.html");
}

// Create a Menu Template
const menuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Add ToDo",
                click() {
                    createAddWindow();
                },
            },
            {
                label: "Quit",
                accelerator:
                    process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
                click() {
                    app.quit();
                },
            },
        ],
    },
];

if (process.platform === "darwin") {
    menuTemplate.unshift({});
}
