const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, unique: true, required: true },
    description: { type: String, maxlength: 300 },
    dishCount: { type: Number, default: 0 }
})

const Category = new mongoose.model('category', categorySchema);

module.exports.Category = Category;
module.exports.categorySchema = categorySchema;
