const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    checked: { type: Array, required: true }
});

// ลบการกำหนด unique index หรือ primary key ใน schema
FormSchema.index({ name: 1 }, { unique: false });

const FormModel = mongoose.model("form", FormSchema);

module.exports = FormModel;
