# **Electron** <!-- omit in toc -->

[![wakatime](https://wakatime.com/badge/user/51dfdeb9-1041-42fb-9208-3de488dcae61/project/4069e9a5-039d-4b89-9944-2ae2fb8236e4.svg?style=for-the-badge)](https://wakatime.com/badge/user/51dfdeb9-1041-42fb-9208-3de488dcae61/project/4069e9a5-039d-4b89-9944-2ae2fb8236e4)

A follow-along repository of [StephenGrider](https://github.com/StiphenGrider)'s Course [Electron for Desktop Apps The Complete Developer's Guide](https://www.udemy.com/course/electron-react-tutorial/)

1. [**About**](#about)
    1. [**Limitation of Browser**](#limitation-of-browser)
    2. [**Difference**](#difference)
    3. [**Why?**](#why)
2. [**Installing Electron**](#installing-electron)
3. [**Setting Up**](#setting-up)
4. [**Event Listeners**](#event-listeners)
    1. [**Ready**](#ready)
    2. [**Click**](#click)
    3. [**Right Click**](#right-click)
    4. [**Blur**](#blur)
5. [**Power of Electron**](#power-of-electron)
6. [**IPC**](#ipc)
    1. [**IPC Difference**](#ipc-difference)
    2. [**Enable Node Modules on Renderer**](#enable-node-modules-on-renderer)
    3. [**Send data from Renderer to Main**](#send-data-from-renderer-to-main)
    4. [**Send Data from Main to Renderer**](#send-data-from-main-to-renderer)
7. [**Custom Menu**](#custom-menu)
8. [**Add New Window**](#add-new-window)
9. [**Function based on Environment**](#function-based-on-environment)
10. [**Garbage Collection**](#garbage-collection)
11. [**Roles**](#roles)
12. [**Browser Window Configuration**](#browser-window-configuration)
    1. [**Window Resolution**](#window-resolution)
    2. [**Frame**](#frame)
    3. [**Window Resizing**](#window-resizing)
    4. [**Show**](#show)
    5. [**Skip Taskbar**](#skip-taskbar)
13. [**Tray**](#tray)
    1. [**Create Tray**](#create-tray)
    2. [**Adding Event Listener**](#adding-event-listener)
    3. [**Tool Tip**](#tool-tip)
    4. [**Context Menu**](#context-menu)
14. [**Bounds**](#bounds)
    1. [**Get Bounds**](#get-bounds)
        1. [**Through Window Position**](#through-window-position)
        2. [**Through Event**](#through-event)
    2. [**Set Bounds**](#set-bounds)

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

-   Add _`electron .`_ as the start script in your _`package.json`_

```json
...
"scripts: [
    "start": "electron ."
]
...
```

1. Create `index.js` file.
2. Import electron module (with require).
3. Extract `app` & `BrowserWindow` object from electron.
4. Add `ready` event listener on `app`.
5. Create new `BrowserWindow` object in the callback function.

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

## **Event Listeners**

-   Allows you to listen for an event on a particular window or app.

![Events](https://github.com/StephenGrider/ElectronCode/blob/master/diagrams/001%20-%20events.png?raw=true)

#### **Ready**

-   `ready` is used when window is ready (completely rendered).

```javascript
mainWindow.on("ready", () => {
    console.log("You are ready!");
});
```

#### **Click**

-   `click` is used when user clicks on the window.

```javascript
mainWindow.on("click", () => {
    console.log("You Just Clicked!");
});
```

#### **Right Click**

-   `right-click` is used when user right clicks on the window.

```javascript
mainWindow.on("right-click", () => {
    console.log("You Just Right Clicked!");
});
```

#### **Blur**

-   `blur` is used when user looses it's focus from the window.

```javascript
mainWindow.on("blur", () => {
    console.log("You Lost Focus!");
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

## **Browser Window Configuration**

#### **Window Resolution**

-   We can set the default width and height of the window with the keys `width` and `height` and set it to the pixel value.

```javascript
mainWindow = new BrowserWindow({
    width: 300,
    height: 500,
});
```

#### **Frame**

-   The frame contains the menu bar and the title bar to minimize, full-screen or close the application.
-   `frame` can be set to false if we don't want to display the frame.

```javascript
mainWindow = new BrowserWindow({
    frame: false,
});
```

#### **Window Resizing**

-   We can set whether we want the user to resize our app screen or not.
-   `resizable` is the flag used to enable or disable the resizing of the window.
-   Default value is true.

```javascript
mainWindow = new BrowserWindow({
    resizable: false,
});
```

#### **Show**

-   `show` allows you to either show or hide the window when the application is launched.
-   By default `show` is set to `true`.

```javascript
mainWindow = new BrowserWindow({
    show: false,
});
```

#### **Skip Taskbar**

-   `skipTaskbar` allows you to hide the window's (application's) Taskbar Icon.
-   By default `skipTaskbar` is set to `false`.

```javascript
mainWindow = new BrowserWindow({
    skipTaskbar: false,
});
```

## **Tray**

#### **Create Tray**

-   Electron has a Tray object which allows you to create a tray icon for your application.
-   Every Tray has an icon.
-   Icon doesn't needs to have the specific resolution indicator (eg. _icon@2x.png_), Electron adjusts the icon to be used automatically.

```javascript
// Import Tray from electron
const { Tray } = require("electron");

app.on("ready", () => {
    ...
    const iconName = "windows-icon.png";
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    // Adding Tray Icon of Application
    new Tray(iconPath);
});
```

#### **Adding Event Listener**

```javascript
let tray;

app.on("ready", () => {
    ...
    tray = new Tray();

    // Click Event Listener on Tray
    tray.on("click", () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
        }
    });
})
```

#### **Tool Tip**

-   ToolTips are used to display the short information whenever we hover on some object.
-   `setToolTip` method can be used on the tray object to set the tool tip.

```javascript
const tray = new Tray();

// Setting tooltip
tray.setToolTip("Timer App");
```

#### **Context Menu**

-   Context Menu can be added to the Tray with the help of `popUpContextMenu` method on tray object.
-   `popUpContextMenu` takes Menu Template as a parameter to display the menu items in the context menu.

```javascript
tray.on("right-click", () => {
    // Create context menu items
    const menuConfig = Menu.buildFromTemplate([
        {
            label: "Quit",
            click: () => {
                app.quit();
            },
        },
    ]);

    // Adding Context Menu
    tray.popUpContextMenu(menuConfig);
});
```

## **Bounds**

-   Allows you to see the position of where the event happened on the screen.
-   Bounds are automatically passed to the callback function with event by electron.

#### **Get Bounds**

##### **Through Window Position**

```javascript
const { height, width } = mainWindow.getBounds();
```

##### **Through Event**

```javascript
tray.on("click", (event, bounds) => {
    console.log(bounds.x, bounds.y);
    // Windows: Somewhere around (1283, 824) -> (1315, 784) ie. lower right (position of tray on taskbar)
    // MacOS: top-right
});
```

#### **Set Bounds**

-   We can set the position of the window with `setBounds()`.
-   It takes x position, y position to be displayed at and the width & height of the window to be displayed.

```javascript
mainWindow.setBounds({
    x: xPosition,
    y: yPosition,
    width: widthValue,
    height: heightValue,
});
```
