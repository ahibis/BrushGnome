const {app, BrowserWindow} = require('electron')
const path = require('path')

const isDev = process.env.IS_DEV == "true" ? true : false;
const isServer = process.env.server == "true"? true : false;
function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.resolve(__dirname,"public","favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWindow.setMenuBarVisibility(false)
  if(isServer)
    mainWindow.loadURL(
    'http://localhost:3000'
    );
  else
    mainWindow.loadFile('dist/index.html')
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
