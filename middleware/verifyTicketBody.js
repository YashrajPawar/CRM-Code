const constants = require('../utils/constants');

function validateTicketRequestBody(req, res, next) {
    if (!req.body.title) {
        res.status(400).send({
            message: 'title is required'
        })
    }

    if (!req.body.description) {
        res.status(400).send({
            message: 'description is required'
        })
    }

    next();
}

function verifyTicketStatus(req, res, next) {
    const givenStatus = req.body.status;
    const allowedStatus = [constants.ticketStatus.open, constants.ticketStatus.inProgress, constants.ticketStatus.closed, constants.ticketStatus.blocked];

    if (givenStatus && !allowedStatus.includes(givenStatus)) {

        return res.status(400).send({
            message: 'Invalid status provided!. Please provide a valid status'
        })
    }

    next();
}

module.exports = {
    validateTicketRequestBody: validateTicketRequestBody,
    verifyTicketStatus: verifyTicketStatus,
}