<template>
    <div>
        <el-button type="primary" @click="openDialog">弹出本地对话框</el-button>
        <el-button type="primary" @click="openLoginWindow"
            >弹出登录窗口</el-button
        >
    </div>
</template>

<script>
import dialog from '../desktop_components/dialogs/base'
export default {
    methods: {
        openLoginWindow() {
            // open字段防止了死循环的存在，仅仅在第一次设置这个，
            // 导致后续通过url请求时并不会进入重新打开窗口这种死循环
            this.$router.push({ name: 'Login', params: { open: true } })
        },
        openDialog() {
            new dialog().info()
        }
    }
}
</script>

<style lang="scss"></style>
