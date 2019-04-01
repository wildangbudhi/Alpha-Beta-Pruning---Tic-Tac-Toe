const { app, BrowserWindow } = require('electron')
const ipc = require('electron').ipcMain

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let winHasil;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 1400, height: 700, resizable: false })
  //winIntro = new BrowserWindow({ frame:false, width:400, height:320 });
  
  winHasil = new BrowserWindow()
  winHasil.loadFile('web/hasil.html');
  winHasil.hide();

  // and load the index.html of the app.
  win.loadFile('web/run.html')
  //winIntro.loadFile('web/index.html')

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    app.quit();
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/*

ipcMain.on('board-size', (event, arg) => {
  // Request to update the label in the renderer process of the second window
  win.webContents.send('action-update-label', arg);
});
*/

//Menangkap ukuran board
ipc.on('ukuran', function(e, item){
  winHasil.webContents.send('ukuran', item);
  console.log(item);
});
