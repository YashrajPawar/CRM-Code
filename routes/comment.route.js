const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/auth.middleware');
const verifyCommentBody = require('../middleware/verifyCommentReqBody');

module.exports = function (app) {

    app.post('/crm/api/v1/tickets/:ticketId/comments', [authMiddleware.verifyToken, verifyCommentBody.verifyCommentBody], commentController.createComment);
    app.get('/crm/api/v1/tickets/:ticketId/comments', [authMiddleware.verifyToken], commentController.fetchComments);

}