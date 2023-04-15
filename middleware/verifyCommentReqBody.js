const Ticket = require("../models/ticket.model");



async function verifyCommentBody(req, res, next) {


    if (!req.params.ticketId) {

        res.status(400).send({
            message: "ticket is not present !"
        });
        return;
    }

    const ticket = await Ticket.findOne({ _id: req.params.ticketId });

    if (!ticket) {
        res.status(400).send({
            message: "ticket id does not exist !"
        });
        return;
    }
    if (!req.body.content) {

        res.status(400).send({
            message: "content cannot be empty !"
        });
        return;
    }

    next();
}


module.exports={
    verifyCommentBody:verifyCommentBody,
}