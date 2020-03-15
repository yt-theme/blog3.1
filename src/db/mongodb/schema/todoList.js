// 待办事项

const bcrypt = require('bcrypt')

module.exports = (mongoose) => {
    return mongoose.Schema({
        // _id
        // 事项内容
        content:     { type: String },
        // 开始时间戳
        start_time:  { type: Number },
        // 结束时间戳
        end_time:    { type: Number },
        // 完成或忽略时间
        overed_time: { type: Number },
        // 所属用户
        user_id:     { type: String },
        /*
            flag: 1当前正在进行的 2队列中等待的 3用户进行了完成操作的 4用户进行了忽略操作的
            前端处理逻辑:
            1.超时只提示状态即可
            2.
            ----------------------------------------
            if flag==1 then
            
            fi
            if flag==2 then

            fi
            if flag==3 then
            
            fi
            if flag==4 then

            fi
            ----------------------------------------
        */
        flag:       { type: Number }
    })
}