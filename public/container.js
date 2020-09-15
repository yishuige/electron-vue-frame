const { app, BrowserWindow, ipcMain, remote } = require('electron')
require('./server')
function createWindow() {
    // 创建浏览器窗口
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // 无法使用 jQuery、RequireJS、Meteor、AngularJS,则禁用 Node.js
            nodeIntegration: true
        },
        show: false
    })
    // 服务形式加载index.html文件非本地形式
    win.loadURL('http://localhost:1337/')
    win.once('ready-to-show', () => {
        win.show()
    })
}

vuex = { version: 0 }

// electron全局变量监听事件
ipcMain.on('update-global', (event, arg) => {
    //执行发布事件
    // 更新后通知vuex更新，本想延迟更新，但是父子组件若是用了这套，并不会出现之前的vuex那样
    // 或许多级变量，也即是单页面需要用到的，就vuex，不需要的多窗口就用这个electron全局事件
    // 不需要担心调用方式，因为均在封装在vuex里面，外界对此仅为vuex的调用，是否应用全局则需要在vuex里面设置
    vuex[arg.key] = arg.value
    // node当前应用全局变量版本控制
    vuex.version++
})

// 应用程序准备就绪后打开一个窗口
app.whenReady().then(createWindow)
