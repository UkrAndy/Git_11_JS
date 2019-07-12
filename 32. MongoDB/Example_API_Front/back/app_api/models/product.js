const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        count: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
