const { ipcRenderer } = require('electron');

var launchBtn = document.getElementById('btn-launch');

launchBtn.addEventListener('click', () => {
    ipcRenderer.send('launch-app');
});
