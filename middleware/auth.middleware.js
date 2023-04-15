const jwt = require('jsonwebtoken');
const config = require('../config/auth.config')
const User = require('../models/user.model')

function verifyToken(req, res, next) {

    let token = req.headers['x-access-token'];
    console.log(token);
    if (!token) {
        res.status(403).send({
            message: 'No Token Provided'
        })
    }
 

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({
                message: 'Unauthorised'
            })
        }
        console.log(decoded)
        req.userId = decoded.id;
        next();
    })
}

async function isAdmin(req, res, next) {
    const user = await User.findOne({
        userId: req.userId
    })
    console.log(req.userId)
    if (user && user.userType == "ADMIN") {
        next();
    }
    else {
        return res.status(403).send({
            message: 'Require Admin role to access this feature'
        })
    }
}


async function checkUserType(req, res, next) {

    const loggedInUser = await User.findOne({
        userId: req.userId
    })

    const userToUpdate = await User.findOne({
        userId: req.params.userId
    })

    console.log(req.userId)
    if (loggedInUser && loggedInUser.userType == "ADMIN") {
        next();
    }
    else if (loggedInUser.userType == "CUSTOMER" || (loggedInUser.userType == "ENGINEER" && loggedInUser.userStatus == 'PENDING')) {
        console.log(req.userId, '   ', user.userId)
        if (loggedInUser.userId == userToUpdate.userId) {
            next();
        }
        else {
            return res.status(403).send({
                message: 'You are not the owner'
            })
        }
    }
    else {
        return res.status(403).send({
            message: 'Require Admin role to access this feature'
        })
    }
}

module.exports = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    checkUserType: checkUserType
}