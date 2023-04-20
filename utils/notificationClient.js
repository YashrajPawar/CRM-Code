
/**
 * This Client here is nothing but a POSTMAN  
 * In Postman we give req body and etc, same thing we have created but it is manually 
 */

const Client = require('node-rest-client').Client;

const client = new Client();

module.exports = (ticketId, subject, content, emailIds, requester) => {

    
    const reqBody = {
        subject: subject,
        content: content,
        recipientsEmail: emailIds,
        requester: requester,
        ticketId: ticketId
    }

    var args = {
        data: reqBody,
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://localhost:5400/notificationservice/api/v1/notification", args, function (data, response) {

        console.log("Notification request sent")

    })

}
