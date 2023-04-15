const Ticket = require('../models/ticket.model');
const objectController = require('../utils/objectConverter')
const User = require('../models/user.model');
const objectConverter = require('../utils/objectConverter');
const constants = require('../utils/constants');


async function createTicket(req, res) {

    const ticketObj = {
        title: req.body.title,
        description: req.body.description,
        ticketPriority: req.bodyticketPriority,
        status: req.body.status,
        reporter: req.userId,
    }

    /**
     * 
     * Getting Assignee details from User model whose is Engineer and status is Approved 
     */

    const engineer = await User.findOne({
        userType: 'ENGINEER',
        userStatus: 'APPROVED'
    })

    ticketObj.assignee = engineer.userId;

    try {

        const ticket = await Ticket.create(ticketObj);

        /**
         * Update Customer and Engineer data
         */


        if (ticket) {
            const user = await User.findOne({
                userId: req.userId
            })

            //Updating Customer 
            user.ticketsCreated.push(ticket._id);
            await user.save();

            //Updating Engineer
            engineer.ticketsAssigned.push(ticket._id);
            await engineer.save();
        }



        res.send(objectController.ticketResponse(ticket))

    } catch (err) {

        console.log('error while creating the ticket ', err)
        return res.status(500).send({
            message: 'internal server error'
        })

    }
}


async function updateTicket(req, res) {
    const ticket = await Ticket.findOne({ _id: req.params.id });

    /**
     * 
     * Ticket Creater, Ticket Assignee and Admin can only update the ticket
     * 
     */

    if (!ticket) {
        return res.status(400).send({
            message: 'Ticket with the ID is not present'
        })
    }

    const loggedUser = await Ticket.findOne({
        userId: req.userId
    })

    if (ticket.reporter == req.userId || req.userId == ticket.assignee || loggedUser.userType == constants.userTypes.admin) {

        //Details Allowed to Update
        ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority;
        ticket.status = req.body.status != undefined ? req.body.status : ticket.status;
        ticket.title = req.body.title != undefined ? req.body.title : ticket.title;
        ticket.description = req.body.description != undefined ? req.body.description : ticket.description;

        const updatedTicket = await ticket.save();
        res.status(200).send(objectConverter.ticketResponse(updatedTicket));

    } else {

        res.status(401).send({
            message: 'Ticket can only be updated by creator'
        })
    }

}


async function getAllTickets(req, res) {

    const queryObj = {}

    if (req.query.status != undefined) {
        queryObj.status = req.query.status;
    }

    const loggedUser = await User.findOne({
        userId: req.userId
    })

    if (loggedUser.userType == 'ADMIN') {
        //Do nothing
    } else if (loggedUser.userType == 'ENGINEER') {
        queryObj.assignee = req.userId;
    } else {
        queryObj.reporter = req.userId;
    }


    const tickets = await Ticket.find(queryObj);

    res.status(200).send(objectConverter.ticketListResponse(tickets));


}

async function getTicketById(req, res) {

    try {
        const ticket = await Ticket.findOne({ _id: req.params.id });

        if (!ticket) {
            res.status(200).send('Ticket not found')
        }

        /**
         * This feature is only available to Admin, ticket creator and ticket assignee 
         */

        if (req.userId == ticket.assignee || req.userId == ticket.reporter || User.userType == 'ADMIN') {
            return res.status(200).send(objectConverter.ticketResponse(ticket));

        } else {
            return res.status(200).send([]);
        }

    } catch (err) {

        return res.status(500).send({
            message: 'Internal Server Error'
        })
    }

}


module.exports = {
    createTicket: createTicket,
    updateTicket: updateTicket,
    getTicketById: getTicketById,
    getAllTickets: getAllTickets,
}