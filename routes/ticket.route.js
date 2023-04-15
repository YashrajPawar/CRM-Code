const ticketController = require('../controllers/ticket.controller');
const authMiddleware = require('../middleware/auth.middleware');
const verifyReq = require('../middleware/verifyTicketBody');

module.exports = function (app) {

    app.post('/crm/api/v1/ticket', [authMiddleware.verifyToken, verifyReq.validateTicketRequestBody], ticketController.createTicket);
    app.put('/crm/api/v1/tickets/:id', [authMiddleware.verifyToken, verifyReq.verifyTicketStatus], ticketController.updateTicket);
    app.get('/crm/api/v1/tickets/:id', [authMiddleware.verifyToken], ticketController.getTicketById)


}
