const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: function () {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: function () {
            return Date.now();
        }
    },
    userType: {
        type: String,
        required: true,
        default: 'CUSTOMER'
    },
    userStatus: {
        type: String,
        required: true,
        default: 'APPROVED'
    },
    ticketsCreated: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Ticket'
    },
    ticketsAssigned: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Ticket'
    }
})

module.exports = mongoose.model('user', userSchema);