# **Electron** <!-- omit in toc -->

1. [**About**](#about)
   1. [**Limitation of Browser**](#limitation-of-browser)
2. [**Installing Electron**](#installing-electron)
3. [**Setting Up**](#setting-up)

## **About**

-   Open-source JavaScript Framework.
-   Developed by GitHub in 2014.
-   Used to build desktop apps with the technologies used to make websites (HTML, CSS, JavaScript).
-   Let's you build cross-platform Desktop apps.
-   Is just a Chromium based window that can render webpages.
-   Allows you to integrate any frontend framework eg. React, Angular, Vue, etc. in your apps.

### **Limitation of Browser**

-   Can't access your hard drive (unless you feed a specific file)

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
