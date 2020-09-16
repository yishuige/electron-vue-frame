# electron-vue-frame

base on electron and vue 2.X and element-ui

## 使用

1. node 全局变量设置

```bash
# 1.store/index.js 添加vuex的变量以及mutations函数，如本例中的addNodeVuexNum函数

# 2.页面获取和vuex一致，例：
computed: {
        nodeVuexNum: function() {
            return this.$store.state.yishui
        }
    }
# 3.页面修改赋值和vuex一致，例：
   this.$store.commit('addNodeVuexNum',...arg)
```

2. 系统功能的封装

```bash
# 1.添加封装的功能的事件到vuex定义的队列中，
store.commit('event_enqueue', {
            event: '自定义的功能模块名称',
            parameter: '可以是任意的对象或者字符串，代表你功能需要的传参',
            action: '你希望执行的函数，比如例子中调用系统的弹框'
        })

# 2.封装调用：
electron.ipcRenderer.send('自定义的功能模块名称')

# 3.外部调用，例：
    new dialog().info()
```

3.页面跳转

```bash
# 1.要是vue页面跳转，保持不变

# 2.弹框或新建窗口跳转，利用routes的meta变量封装跳转的标志和参数

# 3.弹框或新建窗口的外部跳转，例：
    this.$router.push({ name: 'Login', params: { open: true } })
```
