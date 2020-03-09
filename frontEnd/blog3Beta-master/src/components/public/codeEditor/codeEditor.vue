<template>
    <div class="codeEditor_container">
        <textarea v-model="content" 
                             ></textarea>
    </div>
</template>

<script>
export default {
    props: {
        // 内容
        content: String,
        // 只读
        readonly: Boolean
    },
    model: {
        prop: 'content',
        event: 'parent-event'
    },
    data () {
        return {
            
        }
    },
    computed: {
        
    },
    methods: {
     
    }
}
</script>

<style scoped>
.codeEditor_container {
    width: 100%;
    height: 100%;
}
</style>
