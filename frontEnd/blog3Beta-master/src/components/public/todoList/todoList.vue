<template>
    <div class="todoList_container">
        <!-- head -->
        <div class="todoList_head">
            <input placeholder="Event" type="input" v-model="event_str"/>
            <div class="split"></div>
            endDate
            <div class="split"></div>
            <input placeholder="EndDate" type="date" v-model="end_date"/>
            <div class="split"></div>
            endTime
            <div class="split"></div>
            <input placeholder="EndTime" type="time" v-model="end_time"/>
            <div class="split"></div>
            <button @click="add">Add</button>
        </div>
        <!-- body -->
        <div class="todoList_body">
            <!-- left -->
            <div>
                <!-- 正在进行 默认单个 可以手动添加多个-->
                <ul class="todoList_doing">
                    <li>
                        <h4>Doing</h4>
                    </li>
                    <li v-for="(ite, ind) in transSortType_obj.doing" :class="{'todoList_timeOverLi': ite.end_time<=(new Date().getTime())}">
                        <div>
                            <span>{{ite.content}}</span>
                        </div>
                        <div>
                            <div>
                                <button @click="set_complete(ite)">complete</button>
                                <button @click="set_ignore(ite)">ignore</button>
                                <button @click="set_later(ite)">later</button>
                            </div>
                            <span>{{dateTimeFormatter(ite.end_time)['dateTime']}}</span>

                        </div>
                    </li>
                </ul>
                <!-- 队列中 剩余的 -->
                <ul class="todoList_waiting">
                    <li>
                        <h4>Waiting</h4>
                    </li>
                    <li v-for="(ite, ind) in transSortType_obj.waiting" :class="{'todoList_timeOverLi': ite.end_time<=new Date().getTime()}">
                        <div>
                            <span>{{ite.content}}</span>
                        </div>
                        <div>
                            <div>
                                <button @click="set_complete(ite)">complete</button>
                                <button @click="set_ignore(ite)">ignore</button>
                                <button @click="set_earlier(ite)">early</button>
                            </div>
                            <span>{{dateTimeFormatter(ite.end_time)['dateTime']}}</span>

                        </div>
                    </li>
                </ul>
            </div>
            <!-- right -->
            <div>
                <!-- 已完成 && 忽略的 -->
                <ul class="todoList_overed">
                    <li>
                        <h4>Overed</h4>
                    </li>
                    <li v-for="(ite, ind) in transSortType_obj.overed" :class="{'todoList_timeOverLi': ite.end_time<=(new Date().getTime())}">
                        <div>
                            <h5>
                                <template>
                                    <i v-if="ite.flag==3" style="color: #419b9f">Compl</i>
                                    <i v-else style="color: #b7b708">ignore</i>
                                </template>
                                 at: {{dateTimeFormatter(ite.overed_time)['dateTime']}}</h5>
                            <span>{{ite.content}}</span>
                        </div>
                        <div>
                            <div>
                                <button @click="set_delete(ite)">delete</button>
                            </div>
                            <span>{{dateTimeFormatter(ite.end_time)['dateTime']}}</span>

                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            event_str: '',

            end_date: this.dateTimeFormatter()['date'],
            end_time: this.dateTimeFormatter()['time'],

            transSortType_obj: { 'doing': [], 'waiting': [], 'overed': [] }
        }
    },
    computed: {
        todoListShow_state () {
            console.log("todoListShow_state0 =>")
            if (this.$store.state.todoListShow_state) {
                this.end_date = this.dateTimeFormatter()['date']
                this.end_time = this.dateTimeFormatter()['time']
                // 请求todoList
                this.$store.dispatch('query_todoList', {})
            }
            return this.$store.state.todoListShow_state
        },
        // 待办数据
        todoList_data () {
            return this.$store.state.todoList_data
        }
    },
    watch : {
        todoListShow_state (val) {
            console.log("todoListShow_state =>", val)
            if (val) {
                // this.end_date = this.dateTimeFormatter()['date']
                // this.end_time = this.dateTimeFormatter()['time']
                // // 请求todoList
                // this.$store.dispatch('query_todoList', {})
            }
        },
        // 待办数据 变更时处理
        todoList_data (val_arr) {
            if (val_arr) {
                // 处理数据
                this.handle_todoList_data(val_arr)
            }
        }
    },
    methods: {
        add () {
            let self = this
            let start_stamp  = new Date().getTime()
            let end_stamp = new Date(this.end_date + ' ' + this.end_time).getTime()
            
            this.$store.dispatch("add_todoList", {
                "content":    self.event_str,
                "start_time": start_stamp,
                "end_time":   end_stamp,
                "callback":   () => {
                    self.event_str = ''
                    self.$store.dispatch('query_todoList', {})
                }
            })
        },
        // 将待办数据分成 正在进行 && 队列 && 结束
        handle_todoList_data (val_arr) {
            console.log("待办数据 =>", val_arr)
            let self = this
            // 当前时间戳
            let cur_timeStamp = new Date().getTime()
            // 用于存储有无 is_doing 数据
            let has_doingFlag = false
            // 用于存储时间最早的数据
            let the_early_data = { "end_time": 9007199254740992, "_id": '' }
            // 用于存储转换后分类
            let transSortType_obj = {'doing': [], 'waiting': [], 'overed': []}

            

            for(let i=0; i<val_arr.length; i++) {

                // 起止时间
                let tmp_start_time = val_arr[i]['start_time']
                let tmp_end_time   = val_arr[i]["end_time"]

                // doing
                if (val_arr[i]['flag'] == 1) {
                    has_doingFlag = true
                    // 按开始时间排序 && 分类 -> doing
                    transSortType_obj["doing"].push( val_arr[i] )
                }
                // overed 结束 包含 flag==3 && flag==4
                else if ((val_arr[i]['flag'] == 3) || (val_arr[i]['flag'] == 4)) {
                    // 分类 -> overed
                    transSortType_obj["overed"].push( val_arr[i] )
                }
                // waiting
                else if (val_arr[i]['flag'] == 2) {
                    // 按开始时间排序 && 分类 -> waiting
                    transSortType_obj["waiting"].push( val_arr[i] )
                }


                // the_early_data 最早的数据 如果最早的数据是 overed 则用第二早的数据 依此类推
                if ((tmp_end_time < the_early_data["end_time"]) && (val_arr[i]['flag']==2)) {
                    console.log("设置最早的数据 =>")
                    the_early_data["end_time"] = tmp_end_time
                    the_early_data["_id"]      = val_arr[i]["_id"]
                }
                
            }


            // --------------------------- 排序 ------------------------------
            transSortType_obj["doing"]   = sortByEndOrOveredTime(1, transSortType_obj["doing"])
            transSortType_obj["waiting"] = sortByEndOrOveredTime(1, transSortType_obj["waiting"])
            transSortType_obj["overed"]  = sortByEndOrOveredTime(2, transSortType_obj["overed"])
            // 按 end_time || overed_time 顺序排序方法 mode: 1, 2
            function sortByEndOrOveredTime (mode, data_objArr) {
                if (mode == 1) {
                    return data_objArr.sort((obj1, obj2) => { return obj1["end_time"] - obj2["end_time"] })
                }
                if (mode == 2) {
                    return data_objArr.sort((obj1, obj2) => { return obj2["overed_time"] - obj1["overed_time"] }) 
                }
            }
            // --------------------------------------------------------------

            this.transSortType_obj = transSortType_obj

            // 如果没有 has_doingFlag 数据则把时间最早的变为flag=1
            if (!has_doingFlag) {
                this.$store.dispatch('update_todoList', { 
                    "todo_id": the_early_data["_id"],
                    "flag":    1,
                    "callback": () => {
                        self.$store.dispatch('query_todoList', {})
                    }
                })
            }
        },
        // ---------------------------------------------------------------
        set_complete(ite_obj) {
            let self = this
            let cur_timeStamp = new Date().getTime()
            this.$store.dispatch('update_todoList', { 
                "todo_id":     ite_obj["_id"],
                "flag":        3,
                "overed_time": cur_timeStamp,
                "callback": () => {
                    self.$store.dispatch('query_todoList', {})
                }
            })
        },
        set_ignore(ite_obj) {
            let self = this
            let cur_timeStamp = new Date().getTime()
            this.$store.dispatch('update_todoList', { 
                "todo_id": ite_obj["_id"],
                "flag":    4,
                "overed_time": cur_timeStamp,
                "callback": () => {
                    self.$store.dispatch('query_todoList', {})
                }
            })
        },
        set_later(ite_obj) {
            let self = this
            this.$store.dispatch('update_todoList', { 
                "todo_id":     ite_obj["_id"],
                "flag":        2,
                "callback": () => {
                    self.$store.dispatch('query_todoList', {})
                }
            })
        },
        set_earlier(ite_obj) {
            let self = this
            this.$store.dispatch('update_todoList', { 
                "todo_id": ite_obj["_id"],
                "flag":    1,
                "callback": () => {
                    self.$store.dispatch('query_todoList', {})
                }
            })
        },
        set_delete(ite_obj) {
            let self = this
            this.$store.dispatch('delete_todoList', { 
                "todo_id": ite_obj["_id"],
                "callback": () => {
                    self.$store.dispatch('query_todoList', {})
                }
            })
        },
        dateTimeFormatter (timeStamp) {
            let DATE = null
            if (timeStamp) {
                DATE = new Date(Number(timeStamp))
            } else {
                DATE = new Date()
            }
            let date = `${ DATE.getFullYear() }-${ (DATE.getMonth() + 1) < 10  ? '0' + (DATE.getMonth() + 1) : (DATE.getMonth() + 1) }-${ (DATE.getDate() + 1) < 10  ? '0' + (DATE.getDate()) : (DATE.getDate()) }`
            let time = `${ 
                    DATE.getHours() < 10  ? '0' + (DATE.getHours()) : (DATE.getHours()) 
                }:${ 
                    DATE.getMinutes() < 10  ? '0' + (DATE.getMinutes()) : (DATE.getMinutes()) 
                }:${ 
                    DATE.getSeconds() < 10  ? '0' + (DATE.getSeconds()) : (DATE.getSeconds()) 
                }`
            return { date, time, dateTime: date + ' ' + time }
        },
    }
}
</script>

<style scoped>
.split { width: 11px; }
.todoList_timeOverLi { background-color: #86514e !important; }
.todoList_container {
    position: absolute;
    top: 47px;
    left: 15%;
    width: calc(100vw - 30%);
    height: calc(100vh - 94px);
    min-width: 1000px;
    min-height: 500px;
    border-radius: 4px;
    box-shadow: 0 0 6px #489799;
    border: 1px solid #489799;
    background-color: #113236;
    z-index: 1000;
}
.todoList_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 45px;
    border-bottom: 1px dashed #489799;
    padding: 0 9px;
}
.todoList_head> input {
    height: 26px;
    border: 0;
    background-color: #ddd;
    border-radius: 4px;
    color: #113236;
    outline: none;
    padding: 0 11px;
}
.todoList_head> input[type=input] {
    width: calc(100% - 130px);
}
.todoList_head> input[type=date], .todoList_head> input[type=time] {
    width:  301px;
}
.todoList_head> button {
    height: 26px;
    border: 0;
    background-color: #489799;
    border-radius: 4px;
    color: #113236;
    padding: 0 11px;
}
.todoList_body {
    display: flex;
    width: 100%;
    height: calc(100% - 45px);
}
.todoList_body ul {
    list-style: none;
}
.todoList_body> div {
    width: calc(50% - 2px);
    overflow: auto;
}
.todoList_body> div:first-child {
    border-right: 1px dashed #489799; 
}
.todoList_doing, .todoList_waiting, .todoList_overed {
    padding: 4px;
}
.todoList_doing li, .todoList_waiting li, .todoList_overed li {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 2px;
    background-color: #335858;
    padding: 7px;
    margin: 4px 0;
}
.todoList_doing li:first-child, .todoList_waiting li:first-child, .todoList_overed li:first-child {
    padding-bottom: 11px;
}
.todoList_doing li> div, .todoList_waiting li> div, .todoList_overed li> div {
    display: flex;
    flex-direction: column;
    /* justify-content: space-between;
    align-items: center; */
    width: 100%;
}
.todoList_doing li> div:last-child, .todoList_waiting li> div:last-child, .todoList_overed li> div:last-child {
    display: flex;
    justify-content: space-between;
    width: 248px;
}
.todoList_doing li> div> div, .todoList_waiting li> div> div, .todoList_overed li> div> div {
    display: flex;
    justify-content: space-between;
}
.todoList_doing li> div> div> button, .todoList_waiting li> div> div> button, .todoList_overed li> div> div> button {
    height: 26px;
    border: 0;
    background-color: #489799;
    border-radius: 4px;
    color: #113236;
    margin-top: 2px;
    margin-left: 5px;
    margin-bottom: 5px;
    padding: 0 11px;
}
.todoList_doing li> div:last-child> span, .todoList_waiting li> div:last-child> span, .todoList_overed li> div:last-child> span {
    padding-left: 5px;
}
.todoList_doing {
    border-bottom: 1px dashed #489799;
}
.todoList_waiting {

}
.todoList_overed {

}
</style>
