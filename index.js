console.log('Initializing electron app...');
const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const { spawn } = require('child_process');

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

// IPC communication to handle launching external app
ipcMain.on('launch-app', () => {
    runExternalProcess();
});

function runExternalProcess() {
    const child = spawn('notepad.exe');
    child.on('error', (err) => {
      console.error('Error launching application:', err);
    });
  }



<<<<<<< refs/remotes/origin/yogitaa
// Exporting functions for testing purposes
=======
// Handle reminder creation
ipcMain.on('createReminder', (event, reminder) => {
    console.log('Reminder created:', reminder);
    // Here you can implement the logic to save the reminder
  });
  
>>>>>>> local
module.exports = {
    createMainWindow,
    runExternalProcess
};
