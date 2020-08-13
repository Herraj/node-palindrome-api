const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: { type: String, required: true },
    isPalindrome: {type: Boolean, required: true}
});

module.exports = mongoose.model('Message', messageSchema);