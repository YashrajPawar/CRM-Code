const Comment = require('../models/comment.model');
const constants = require('../utils/constants');
const User = require('../models/user.model');
const Ticket = require('../models/ticket.model');

async function createComment(req, res) {
    const commentObj = {
        content: req.body.content,
        ticketId: req.params.ticketId,
        commenterId: req.userId
    }

    try {

        const comment = await Comment.create(commentObj);

        res.status(200).send(comment);

    } catch (err) {
        res.status(500).send({
            message: 'Internal server error'
        })
    }
}

async function fetchComments(req, res) {

    const loggedUser = await User.findOne({
        userId: req.userId
    })

    const ticket = await Ticket.findOne({
        _id: req.params.id
    })


    try {

        if (loggedUser.userType != constants.userTypes.admin && ticket.reporter != req.userId && ticket.assignee != req.userId) {
            return res.status(200).send([]);
        }

        const comments = await Comment.find({
            ticketId: req.params.ticketId,
        })

        res.status(200).send(comments);


    } catch (err) {

        res.status(500).send({
            message: 'Internal server error'
        })

    }

}

module.exports = {
    createComment: createComment,
    fetchComments: fetchComments,
}