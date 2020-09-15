import store from '../../store/index'

let event = store.state.event

// 渲染进程发布事件到主进程
function _show(type) {
    if (event.queue.dialog == undefined) {
        store.commit('event_enqueue', {
            event: 'dialog',
            parameter: type,
            action: ipcMainSubscribe
        })
    }
    electron.ipcRenderer.send('dialog')
}

// 基本弹出框封装
class dialog {
    error() {
        _show('error')
    }
    info() {
        _show('info')
    }
    file() {
        _show('file')
    }
    save() {
        _show('save')
    }
}

// 主进程触发事件
function ipcMainSubscribe(parameter, ipcMainEvent) {
    let dialog = electron.remote.dialog
    switch (parameter) {
        case 'error':
            dialog.showErrorBox(
                'An Error Message',
                'Demonstrating an error message.'
            )
            break
        case 'info':
            dialog.showMessageBox(
                {
                    type: 'info',
                    title: 'Information',
                    message: "This is an information dialog. Isn't it nice?",
                    buttons: ['Yes', 'No']
                },
                index => {
                    ipcMainEvent.sender.send(
                        'information-dialog-selection',
                        index
                    )
                }
            )
            break
        case 'file':
            dialog.showOpenDialog(
                {
                    properties: ['openFile', 'openDirectory']
                },
                files => {
                    if (files) {
                        ipcMainEvent.sender.send('selected-directory', files)
                    }
                }
            )
            break
        case 'save':
            dialog.showSaveDialog(
                {
                    title: 'Save an Image',
                    filters: [
                        {
                            name: 'Images',
                            extensions: ['jpg', 'png', 'gif']
                        }
                    ]
                },
                filename => {
                    ipcMainEvent.sender.send('saved-file', filename)
                }
            )
            break
        default:
            break
    }
}

export default dialog
