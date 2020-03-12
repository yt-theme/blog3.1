module.exports = (mongoose) => {
    return mongoose.Schema({
        // url
        url:    { type: String, unique: true },
        // 标签
        label:  { type: String },
    })
}