const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name : {type : String, required : true, unique: true},
    email : {type : String, required : true, unique: true},
    password : {type : String, required : true}
})

const EmployeeModel = mongoose.model("register", EmployeeSchema)

module.exports = EmployeeModel