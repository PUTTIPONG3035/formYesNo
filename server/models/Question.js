const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    name : {type : String, required : true, unique: true},
    question : {type : Array, required : true, unique: true},
    assessment : {type : Array, required : true, unique : true}
})

const QuestionModel = mongoose.model("question", QuestionSchema)

module.exports = QuestionModel