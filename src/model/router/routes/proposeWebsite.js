module.exports = class {
    constructor (router, mongodb_model, middleWare) {
        this.router = router
        this.mongodb_model = mongodb_model
        this.middleWare = middleWare ? middleWare : null
    }
    query () {
        let self = this
        self.router.post('/api/public/proposeWebsite', function (req, res) {
            // 从 mongodb 检索
            self.mongodb_model.find({}).then((v) => {
                res.json({ 'stat': 1, 'msg': 'ok', 'data':  v })
            }).catch((err) => {
                res.json({ 'stat': 0, 'msg':  '数据库查询文件失败', 'data': err })
            })

        })
    }
    add () {
        let self = this
        self.router.post('/api/public/addProposeWebsite',  self.middleWare, function (req, res) {
            const analyz_stat = req.analyz_stat
            const req_url     = req.body.url ? req.body.url : ''
            const req_label = req.body.label ? req.body.label : ''
            
            if (analyz_stat === 1) {
                // 检索有没有重复url
                self.mongodb_model.find({
                    "url": req_url
                }).then((v) => {
                    console.log()
                    if (v.length > 0) {
                        res.json({ 'stat': 0, 'msg':  'url duplication', 'data': '' })
                    } else {

                        // 从 mongodb 检索
                        self.mongodb_model.insertOne({
                            "url": req_url,
                            "label": req_label
                        }).then((v) => {
                            res.json({ 'stat': 1, 'msg': 'ok', 'data':  v })
                        }).catch((err) => {
                            res.json({ 'stat': 0, 'msg':  '建议网址添加失败', 'data': err })
                        })

                    }
                })
            }
        })
    }
    delete () {
        let self = this
        self.router.post('/api/public/deleteProposeWebsite',  self.middleWare, function (req, res) {
            const req_url     = req.body.url ? req.body.url : ''

            self.mongodb_model.deleteOne({
                "url": req_url
            }).then((v) => {
                res.json({ 'stat': 1, 'msg': 'ok', 'data':  v })
            }).catch((err) => {
                res.json({ 'stat': 0, 'msg':  '建议网址删除失败', 'data': err })
            })
        })
    }
}