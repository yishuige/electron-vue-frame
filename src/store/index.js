import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        event: {
            queue: {}
        },
        all: {
            version: 0,
            yishui: electron.remote.getGlobal('vuex').yishui || 0
        }
    },
    mutations: {
        // 同步主渲染进程注册监听事件
        event_enqueue(state, payload) {
            let ipcMain = window.electron.remote.ipcMain
            ipcMain.on(payload.event, ipcMainEvent => {
                //执行发布事件
                payload.action(payload.parameter, ipcMainEvent)
            })
            state.event.queue[payload.event] = ''
        },
        updateGlobal(state, payload) {
            state.all = electron.remote.getGlobal('vuex')
        },
        addNodeVuexNum(state, payload) {
            let ipcRenderer = electron.ipcRenderer
            ipcRenderer.send('update-global', {
                updater: electron.remote.getCurrentWindow().id,
                key: 'yishui',
                value: payload
            })

            state.all.yishui = payload
            state.all.version = electron.remote.getGlobal('vuex').version
        }
    },
    actions: {},
    modules: {}
})
