const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: /^[A-Za-z\s]+$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        match: /^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$/
    },
    image: {
        type: String,
        // required: true
    }
})

module.exports = mongoose.model('User', userSchema);