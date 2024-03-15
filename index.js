console.log('Initializing electron app...');
const { app, BrowserWindow, Menu, Tray } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
let appTray;

app.on('ready', createMainWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow()
    }
});

function createMainWindow() {
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    mainWindow = new BrowserWindow();
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.on('closed', () => {
        console.log('Closing app...');
        mainWindow = null;
    });

    mainWindow.on('minimize', function (event) {
        event.preventDefault();
        mainWindow.hide();
    });

    mainWindow.on('show', function () {
        appTray.setHighlightMode('always');
    });

    appTray = new Tray(path.join(__dirname, 'assets/icons/png/1024x1024.png'));
    appTray.setToolTip('Your App Name');
    appTray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
}

const mainMenuTemplate = [
    {
        label: 'Options',
        submenu: [
            {
                label: 'Created by da3m0ns',
            },
            {
                label: 'Show Dev Tools',
                accelerator: process.platform === 'darwin' ? 'command+D' : 'Ctrl+D',
                click(e, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                label: 'Exit',
                accelerator: process.platform === 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

if (process.platform === 'darwin') {
    mainMenuTemplate.unshift({
        label: app.getName()
    });
}
