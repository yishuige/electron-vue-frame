import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            desktop: true,
            close: true,
            options: {
                width: 400,
                height: 225
            }
        },
        component: () => import('../views/Login.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.desktop) {
        if (to.params.open) {
            // 执行窗口跳转
            let currentWindow = electron.remote.getCurrentWindow()
            let newWindow = electron.remote.BrowserWindow
            let options = to.meta.options
            let win = new newWindow({
                center: options.center || true,
                width: options.width || 600,
                height: options.height || 600,
                webPreferences: {
                    // 无法使用 jQuery、RequireJS、Meteor、AngularJS,则禁用 Node.js
                    nodeIntegration: true
                },
                show: false
                // preload:,
            })
            win.loadURL('http://localhost:1337' + to.path)
            win.removeMenu()
            win.once('ready-to-show', () => {
                win.show()
                // 必须要当且仅当一个在当前展示的窗口，否则调用show无效，或者可能退出进程
                if (to.meta.close) currentWindow.close()
            })
        } else next()
    } else next()
})

export default router
