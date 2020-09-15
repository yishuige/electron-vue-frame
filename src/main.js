import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// electron全局变量监听事件
let currentWindow = electron.remote.getCurrentWindow()
currentWindow.on('focus', event => {
    // 当窗口获得焦点时，检查本地vuex的全局变量版本是否和node环境中版本一致，
    // 不一致则更新到node环境全局变量的最新版本，这是利用的乐观锁去维持各大窗口的全局变量一致
    // 当然还有更新层次的，比如仅仅加载最新版本导致的部分变量更新，毕竟用户焦点能够触及的应该仅仅为一个窗口，
    // 那不存在所谓的导致多窗口版本变更迭代超多代现象,即使可能存在的多2代也无关紧要
    console.info(`node全局版本${electron.remote.getGlobal('vuex').version}`)
    console.info(`当前应用全局版本${store.state.all.version}`)
    if (electron.remote.getGlobal('vuex').version != store.state.all.version)
        store.commit('updateGlobal')
})
