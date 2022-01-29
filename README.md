# **Electron** <!-- omit in toc -->

[![wakatime](https://wakatime.com/badge/user/51dfdeb9-1041-42fb-9208-3de488dcae61/project/4069e9a5-039d-4b89-9944-2ae2fb8236e4.svg?style=for-the-badge)](https://wakatime.com/badge/user/51dfdeb9-1041-42fb-9208-3de488dcae61/project/4069e9a5-039d-4b89-9944-2ae2fb8236e4)

A follow-along repository of [StephenGrider](https://github.com/StiphenGrider)'s Course [Electron for Desktop Apps The Complete Developer's Guide](https://www.udemy.com/course/electron-react-tutorial/)

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
7. [**Add New Window**](#add-new-window)
8. [**Function based on Environment**](#function-based-on-environment)
9. [**Garbage Collection**](#garbage-collection)
10. [**Roles**](#roles)

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
                // Platform based hotkeys
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

## **Add New Window**

-   Add a new window on click of a menu item.

```javascript
let addWindow;
...
function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300, // set window width in pixel
        height: 200, // set window height in pixel
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
        ],
    },
];
```

## **Function based on Environment**

-   Show Development Tools on if its Development environment.

```javascript
if (process.env.NODE_ENV === "development") {
    menuTemplate.push({
        label: "View",
        submenu: [
            {
                label: "Toggle Developer Tools",
                accelerator:
                    process.platform === "darwin"
                        ? "Command+Alt+I"
                        : "Ctrl+Shift+I",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                },
            },
        ],
    });
}
```

## **Garbage Collection**

-   Closing a window doesn't frees up the memory in Electron.
-   We have to manually specify it to work the way JavaScript's Garbage collection works.

```javascript
function createAddWindow() {
    ...
    // Delete the Add Window
    addWindow.on("closed", () => {
        addWindow = null;
    });
}

// Get todo from Add Window and send it to Main Window
ipcMain.on("todo:add", (event, todo) => {
    mainWindow.webContents.send("todo:add", todo);

    // Close the add Window
    addWindow.close();
});
```

## **Roles**

-   There are several predefined roles that are made available by Electron.
-   These roles allow to patch things up easily in your app.
-   eg. adding back the reload menu item to your custom menu without need to create one again.

```javascript
menuTemplate.push({
    label: "View",
    submenu: [{ role: "reload" }],
});
```
