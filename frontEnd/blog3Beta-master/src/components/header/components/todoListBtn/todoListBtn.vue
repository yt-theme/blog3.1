<template>
    <div :class="[$store.state.todoListShow_state ? 'todoListBtn_c_container_active' : 'todoListBtn_c_container']" @click="changeTodoListWinState()">
        todoList
    </div>
</template>

<script>
export default {
    methods: {
        changeTodoListWinState () {
            // 显示 pop
            if (this.$store.state.todoListShow_state) {
                this.$store.dispatch("set_todoListShow_state", false)
            } else {
                this.$store.dispatch("set_todoListShow_state", true)
                // 请求数据 待办事项列表
                this.$store.dispatch("query_todoList_classTypeList", true)
            }
        }
    },
}
</script>

<style scoped>
@keyframes BtnShadowSport {
    0% {box-shadow: 0 0 27px #B0B6B6 inset;}
    50% {box-shadow: 0 0 27px #113337 inset;}
    100% {box-shadow: 0 0 27px #B0B6B6 inset;}
}
.todoListBtn_c_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    color: #ddd;
    background-color: #113336;
    border: 2px solid #489799;
    box-shadow: 0 0 6px #489799;
    text-shadow: 0 0 5px #000;
    margin-right: 6px;
    padding: 0 6px;
    cursor: default;
}
.todoListBtn_c_container_active {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    color: #ddd;
    background-color: #113336;
    border: 2px solid #489799;
    box-shadow: 0 0 6px #489799;
    text-shadow: 0 0 5px #000;
    margin-right: 6px;
    padding: 0 6px;
    cursor: default;
    animation: BtnShadowSport 1s infinite;
}
</style>
