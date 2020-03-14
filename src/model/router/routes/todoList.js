module.exports = class {
    constructor (router, mongodb_model_user, mongodb_model_todoList, middleWare) {
        this.router                 = router
        this.mongodb_model_user     = mongodb_model_user
        this.mongodb_model_todoList = mongodb_model_todoList
        this.middleWare             = middleWare ? middleWare : null
    }
    queryByUserId () {
        let self = this
        self.router.post('/api/queryTodoListByUserId',  self.middleWare, function (req, res) {
            // 用户验证结果
            const analyz_stat = req.analyz_stat
            const user_info   = req.analyz_profile
            const user_id     = user_info["_id"]

            if (analyz_stat === 1) {
                // 从 mongodb 检索
                self.mongodb_model_todoList.find({
                    "user_id": user_id
                }).then((v) => {
                    res.json({ 'stat': 1, 'msg': 'ok', 'data':  v })
                }).catch((err) => {
                    res.json({ 'stat': 0, 'msg':  '数据库查询失败', 'data': err })
                })
            }
        })
    }
    add () {
        let self = this
        self.router.post('/api/addTodoList',  self.middleWare, function (req, res) {
            const analyz_stat = req.analyz_stat
            const user_info   = req.analyz_profile
            const user_id     = user_info["_id"]

            if (analyz_stat) {

                const content    = String(req.body.content)       || ''
                const start_time = String(req.body.start_time)    || ''
                const end_time   = String(req.body.end_time)      || ''
                
                // 检索有没有重复url
                self.mongodb_model_todoList.insertOne({
                    "content":    content,
                    "start_time": start_time,
                    "end_time":   end_time,
                    "user_id":    user_id,
                    // "is_doing":   false,
                    // "is_ignore":  false
                    "flag":       2
                }).then((v) => {
                    res.json({ 'stat': 1, 'msg':  'ok', 'data': v })
                }).catch((err) => {
                    res.json({ 'stat': 0, 'msg':  '新增待办失败', 'data': err })
                })
            }
        })
    }
    // 更新状态 -> end_time is_doing is_ignore
    updateByTodoId () {
        let self = this
        self.router.post('/api/updateTodoListByTodoId',  self.middleWare, function (req, res) {
            const analyz_stat = req.analyz_stat
            const user_info   = req.analyz_profile
            const user_id     = user_info["_id"]

            if (analyz_stat) {

                const todo_id   = req.body.todo_id  || ''
                const flag      = req.body.flag
                const end_time  = req.body.end_time

                // 需要设置的数据
                let set_obj = {}
                if (flag != undefined)     set_obj["flag"]     = flag
                if (end_time != undefined) set_obj["end_time"] = end_time
                
                // 检索有没有重复url
                self.mongodb_model_todoList.updateOne({
                    $and: [
                        { "_id":     todo_id },
                        { "user_id": user_id }
                    ]
                }, { $set: {
                        ...set_obj
                    }
                }).then((v) => {
                    res.json({ 'stat': 1, 'msg':  'ok', 'data': v })
                }).catch((err) => {
                    res.json({ 'stat': 0, 'msg':  '更新待办失败', 'data': err })
                })
            }
        })
    }
    deleteByTodoId () {
        let self = this
        self.router.post('/api/deleteTodoListByTodoId',  self.middleWare, function (req, res) {
            const analyz_stat = req.analyz_stat
            const user_info   = req.analyz_profile
            const user_id     = user_info["_id"]

            if (analyz_stat) {

                const todo_id = req.body.todo_id || ''

                self.mongodb_model_todoList.deleteOne({
                    '_id': todo_id,
                }).then((v) => {
                    res.json({ 'stat': 1, 'msg':  'ok', 'data': v })
                }).catch((err) => {
                    res.json({ 'stat': 0, 'msg':  '删除待办失败', 'data': err })
                })
            }
        })
    }
}