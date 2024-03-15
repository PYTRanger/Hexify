const { app, BrowserWindow } = require('electron');
 
let mainWindow;
 
const createWindow = () => {
   mainWindow = new BrowserWindow({
       width: 800,
       height: 600,
   });
 
   mainWindow.loadURL('http://localhost:3000');
 
   mainWindow.webContents.openDevTools({ mode: 'detach' });   
 
};
 
app.whenReady().then(createWindow);
 
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
       app.quit();
   }
});