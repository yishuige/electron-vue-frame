# electron-vue-frame

base on electron and vue 2.X and element-ui

## 使用

1. node 全局变量设置

```bash
# 1.store/index.js 添加vuex的变量的mutations函数，如本例中的addNodeVuexNum函数

# 2.页面获取和vuex一致，例：
computed: {
        nodeVuexNum: function() {
            return this.$store.state.yishui
        }
    }
# 3.页面修改赋值和vuex一致，例：
   this.$store.commit('addNodeVuexNum',...arg)
```
