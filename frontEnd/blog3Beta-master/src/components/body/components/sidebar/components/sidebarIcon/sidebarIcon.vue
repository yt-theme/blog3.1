<template>
    <div class="sidebarIcon_container">
        <!-- <img :src="img"/> -->
        <a :href="url" target="_blank">{{label}}</a>
        <!-- delete button -->
        <i @click="deleteSidebarIcon(url)" class="sidebarIcon_delete_btn">
            <img :src="delete_icon"/>
        </i>
    </div>
</template>

<script>
import delete_icon from '@/assets/deleteWindow.svg'
export default {
    props: ['url', 'label', 'img'],
    data () {
        return {
            delete_icon: delete_icon
        }
    },
    methods: {
        deleteSidebarIcon (url) {
            let self = this
            self.$store.dispatch('deleteSidebarWebsiteList', { "url": url  })
        }
    }
}
</script>

<style scoped>
    @keyframes sidebarIconShadow {
        0% {box-shadow: 0 0 27px #113337 inset,0 0 0px #113337 inset;}
        /* 25% {box-shadow: 0 0 27px #113337 inset,0 0 100px #ebd15f inset;} */
        50% {box-shadow: 0 0 27px #B0B6B6 inset,0 0 27px #29814b inset;}
        100% {box-shadow: 0 0 27px #113337 inset,0 0 0px #113337 inset;}
        /* 75% {box-shadow: 0 0 27px #B0B6B6 inset,0 0 100px #e78e3b inset;} */
        /* 100% {box-shadow: 0 0 27px #113337 inset,0 0 0px #e44439 inset;} */
    }
    .sidebarIcon_container {
        position: relative;
        color: #B0B6B6;
        text-decoration: none;    
        height: 30px;
        outline: none;
        border-radius: 4px;
        box-shadow: 0 0 120px #113034 inset, 0 0 3px #489799;
        border: 2px solid #489799;
        margin-right: 11px;
        margin-top: 11px;
        padding: 0 1em;
    }
    .sidebarIcon_container:hover {
        animation: sidebarIconShadow 4s infinite;
    }
    .sidebarIcon_container> a {
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 26px;
        color: #B0B6B6;
        text-decoration: none;    
    }
    .sidebarIcon_delete_btn {
        position: absolute;
        top: -8px;
        right: -8px;
        display: none;
        justify-content: center;
        align-items: center;
        width: 19px;
        height: 19px;
        background-color: #113034;
        border-radius: 50%;
        border: 2px solid #489799;
        color: #489799;
        cursor: pointer;
    }
    .sidebarIcon_delete_btn> img {
        display: block;
        width: 100%;
        height: 100%;
    }
    .sidebarIcon_container:hover .sidebarIcon_delete_btn{ 
        display: flex;
    }
    .sidebarIcon_container:hover .sidebarIcon_container> a{ 
        text-decoration: underline;
    }
</style>
