const { spawn } = require('child_process');
const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
let appTray;

app.on('ready', createMainWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow();
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

    appTray = new Tray(path.join(__dirname, 'assets/icons/png/smol_logo.jpeg'));
    appTray.setToolTip('Hex');
    appTray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
}

// Main menu template
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

// If macOS, add first menu item
if (process.platform === 'darwin') {
    mainMenuTemplate.unshift({
        label: app.getName()
    });
}

// IPC communication to handle launching external apps
ipcMain.on('launch-app', (event, appName) => {
    if (appName === 'notepad') {
        runExternalProcess('notepad.exe');
    } else if (appName === 'vscode') {
        runExternalProcess('code');
    }
});

function runExternalProcess(command) {
    const child = spawn(command, [], { windowsHide: false });

    child.on('error', (err) => {
        console.error(`Error launching ${command}: ${err}`);
    });

    child.on('exit', (code) => {
        if (code !== 0) {
            console.error(`${command} process exited with code ${code}`);
        }
    });
}

module.exports = {
    createMainWindow,
    runExternalProcess
};

