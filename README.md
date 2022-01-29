# **Electron** <!-- omit in toc -->

1. [**About**](#about)
   1. [**Limitation of Browser**](#limitation-of-browser)
   2. [**Difference**](#difference)
   3. [**Why?**](#why)
2. [**Installing Electron**](#installing-electron)
3. [**Setting Up**](#setting-up)
4. [**Power of Electron**](#power-of-electron)
5. [**IPC**](#ipc)
   1. [**IPC Difference**](#ipc-difference)
   2. [**Enable Node Modules on Renderer**](#enable-node-modules-on-renderer)
   3. [**Send data from Renderer to Main**](#send-data-from-renderer-to-main)
   4. [**Send Data from Main to Renderer**](#send-data-from-main-to-renderer)
6. [**Custom Menu**](#custom-menu)

## **About**

-   Open-source JavaScript Framework.
-   Developed by GitHub in 2014.
-   Used to build desktop apps with the technologies used to make websites (HTML, CSS, JavaScript).
-   Let's you build cross-platform Desktop apps.
-   Is just a Chromium based window that can render webpages.
-   Allows you to integrate any frontend framework eg. React, Angular, Vue, etc. in your apps.

### **Limitation of Browser**

-   Can't access your hard drive (unless you feed a specific file)

### **Difference**

![Electron vs Desktop App](https://github.com/StephenGrider/ElectronCode/blob/master/diagrams/001%20-%20traditional%20desktop%20vs%20electron.png?raw=true)

### **Why?**

![Why](https://github.com/StephenGrider/ElectronCode/blob/master/diagrams/001%20-%20why%20webpages,%20why%20js_.png?raw=true)

## **Installing Electron**

```shell
$ mkdir project-name
$ cd project-name
$ npm init -y
$ npm install electron
```

## **Setting Up**

1. Create `index.js` file.
2. Import electron module (with require).
3. Extract `app` & `BrowserWindow` object from electron.
4. Add `ready` event listener on `app`.
5. Create new `BrowserWindow` object in the callback function.
   ![Events](https://github.com/StephenGrider/ElectronCode/blob/master/diagrams/001%20-%20events.png?raw=true)

```javascript
// Import electron
const electron = require("electron");

// Extract app & BrowserWindow object
const { app, BrowserWindow } = electron;

// Add `ready` event listener on app
app.on("ready", () => {
    // Creating new BrowserWindow object
    const mainWindow = new BrowserWindow({});

    // Serve `index.html` file on the main window
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});
```

## **Power of Electron**

-   **Main Window = Node + Web Browser**
-   Allows you to use Node Modules in the Main Window
    ![Main Window](https://github.com/StephenGrider/ElectronCode/blob/master/diagrams/001%20-%20node%20vs%20browser.png?raw=true)

## **IPC**

-   Inter Process Communication.
-   Allows you to communicate between different processes of the Electron app.
    ![Inter Process Communication](https://github.com/StephenGrider/ElectronCode/blob/master/diagrams/001%20-%20file.png?raw=true)

### **IPC Difference**

-   There are some differences between the methods to send and receive the data through IPC on Electron App and Web App side.
    ![IPC Difference](./images/IPC%20Difference.png)

### **Enable Node Modules on Renderer**

```javascript
let mainWindow;
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile("index.html");
});
```

### **Send data from Renderer to Main**

**Renderer**

```javascript
const electron = require("electron");
const { ipcRenderer } = electron;

const formElement = document.querySelector("form");
formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const { path } = document.querySelector("input").files[0];

    // Send file path with custom event name to Electron
    ipcRenderer.send("video:submit", path);
});
```

**Main**

```javascript
// Get event data from the Web
ipcMain.on("video:submit", (event, path) => {
    console.log(path);
});
```

### **Send Data from Main to Renderer**

**Main**

```javascript
mainWindow.webContents.send("video:metadata", metadata.format.duration);
```

**Renderer**

```javascript
// Receive Data from Main
ipcRenderer.on("video:metadata", (event, duration) => {
    const resultElement = document.getElementById("result");

    resultElement.innerHTML = `Video is ${duration} seconds`;
});
```

## **Custom Menu**

-   Adding a Custom menu removes all the predefined functionality of the default Electron menu.
-   Every Menu Item has a label, optionally an accelerator, a sub-menu and a click function.

```javascript
const { app, BrowserWindow, Menu } = require("electron");

let mainWindow;
app.on("ready", () => {
    ...
    // Use Menu from the Menu Template
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    // Add Menu to the Application
    Menu.setApplicationMenu(mainMenu);
});

// Create a Menu Template
const menuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Add ToDo",
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
```
