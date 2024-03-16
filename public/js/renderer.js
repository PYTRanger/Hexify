const { ipcRenderer } = require('electron');
const { exec } = require('child_process');

// Get references to the launch buttons
var launchNotepadBtn = document.getElementById('btn-launch');
var launchVsCodeBtn = document.getElementById('launch-vscode');

// Add click event listener to launch Notepad button
launchNotepadBtn.addEventListener('click', () => {
    // Send a message to the main process to launch Notepad
    ipcRenderer.send('launch-notepad');
});

// Add click event listener to launch VS Code button
launchVsCodeBtn.addEventListener('click', () => {
    // Execute command to launch VS Code
    exec('code', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error launching VS Code: ${error}`);
            return;
        }
        console.log(`VS Code launched successfully`);
    });
});