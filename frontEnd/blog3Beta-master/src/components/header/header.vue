<template>
    <div class="header_container text_no_select">
      <div class="header_left">
          <Logo></Logo>
      </div>
      <div class="header_center">
          <Search></Search>
      </div>
      <div class="header_right">
          <RealNoteBtn></RealNoteBtn>
          <TodoListBtn></TodoListBtn>
          <SysMonitorBtn></SysMonitorBtn>
          <ActionButtonArea></ActionButtonArea>
          <NotifyArea></NotifyArea>
      </div>
    </div>
</template>

<script>
import Logo from './components/logo/logo'
import MenuList from './components/menuList/menuList'
import NotifyArea from './components/notifyArea/notifyArea'
import ActionButtonArea from './components/actionButtonArea/actionButtonArea'
import SysMonitorBtn from './components/sysMonitorBtn/sysMonitorBtn'
import Search from './components/search/search'
import RealNoteBtn from './components/realNoteBtn/realNoteBtn'
import TodoListBtn from './components/todoListBtn/todoListBtn'
export default {
    components: {
        Logo,
        MenuList,
        NotifyArea,
        ActionButtonArea,
        SysMonitorBtn,
        Search,
        RealNoteBtn,
        TodoListBtn
    }
}
</script>

<style scoped>
.header_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: rgba(204, 209, 210, 0.999); */
    /* background-color: #113236; */
    background-color: rgba(176,182,182,0.3);
    /* border-bottom: 2px solid #489799; */
    /* box-shadow: 0 0 6px #489799; */
    min-height: 33px;
    max-height: 51px;
    padding: 0 6px;
    color: #666;
    overflow-x: auto;
}
.header_left, .header_right {
    display: flex;
    justify-content: center;
}
</style>
