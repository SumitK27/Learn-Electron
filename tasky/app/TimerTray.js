const { app, Tray, Menu } = require("electron");

class TimerTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath);

        this.mainWindow = mainWindow;

        // Set ToolTip
        this.setToolTip("Timer App");

        // Add Click Event Listener
        this.on("click", this.onClick.bind(this));

        this.on("right-click", this.onRightClick.bind(this));
    }

    onClick(event, bounds) {
        // Click event bounds
        const { x, y } = bounds;

        // Window height and width
        const { height, width } = this.mainWindow.getBounds();

        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            // Set position of window
            const yPosition = process.platform === "darwin" ? y : y - height;

            this.mainWindow.setBounds({
                x: Math.floor(x - width / 2),
                y: yPosition,
                width,
                height,
            });

            // Show window
            this.mainWindow.show();
        }
    }

    onRightClick() {
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
        this.popUpContextMenu(menuConfig);
    }
}

module.exports = TimerTray;
