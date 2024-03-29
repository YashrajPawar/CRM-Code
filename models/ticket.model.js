const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: Number,
        default: 5,
    },
    status: {
        type: String,
        required: true,
    },
    reporter: {
        type: String,
        required: true,
    },
    assignee: {
        type: String,

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
})

module.exports = mongoose.model('Ticket', ticketSchema);

