const { ipcRenderer } = require("electron");

const formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const { path } = document.querySelector("input").files[0];

    // Send file path with custom event name to Electron
    ipcRenderer.send("video:submit", path);
});

// Receive Data from Main
ipcRenderer.on("video:metadata", (event, duration) => {
    const resultElement = document.getElementById("result");

    resultElement.innerHTML = `Video is ${duration} seconds`;
});
