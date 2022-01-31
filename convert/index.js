const { app, BrowserWindow, ipcMain } = require("electron");
const ffmpeg = require("fluent-ffmpeg");
const _ = require("lodash");

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

ipcMain.on("videos:added", (event, videos) => {
    const promises = _.map(videos, (video) => {
        // Create a promise that will resolve with the video data
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(video.path, (err, metadata) => {
                video.duration = metadata.format.duration;
                video.format = "avi";
                resolve(video);
            });
        });
    });

    // Wait for all videos to be processed
    Promise.all(promises).then((results) => {
        mainWindow.webContents.send("metadata:complete", results);
    });
});
