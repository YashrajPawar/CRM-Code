function userResponse(users) {
    let userResult = []

    users.forEach(user => {
        userResult.push({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus
        })
    });

    return userResult
}

function ticketResponse(ticket) {
    return {
        title: ticket.title,
        description: ticket.description,
        ticketPriority: ticket.ticketPriority,
        status: ticket.status,
        reporter: ticket.reporter,
        assignee: ticket.assignee,
        id: ticket._id,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
    }
}

function ticketListResponse(tickets) {
    let ticketList = [];

    tickets.forEach(ticket => {
        ticketList.push({
            title: ticket.title,
            description: ticket.description,
            ticketPriority: ticket.ticketPriority,
            status: ticket.status,
            reporter: ticket.reporter,
            assignee: ticket.assignee,
            id: ticket._id,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
        });
    });

    return ticketList;
}

module.exports = {
    userResponse: userResponse,
    ticketResponse: ticketResponse,
    ticketListResponse: ticketListResponse,
}