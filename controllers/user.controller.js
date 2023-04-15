const userModel = require('../models/user.model')
const objectConverter = require('../utils/objectConverter')


/**
 * Fetch list of all the users
 */


async function findAll(req, res) {
    try {

        let userQuery = {};
        let userTypeReq = req.query.userType;
        let userStatusReq = req.query.userStatus;

        if (userTypeReq) {
            userQuery.userType = userTypeReq
        }

        if (userStatusReq) {
            userQuery.userStatus = userStatusReq
        }

        //Below line is used to find all the users from the data base
        const users = await userModel.find({})

        //Below line is used to filter the users based on the filter query
        //const users = await userModel.find(userQuery)
        res.status(200).send(objectConverter.userResponse(users));
    } catch (err) {
        console.log('Error fetching all the users')
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}


async function findById(req, res) {

    const reqUserId = req.params.userId;
    console.log(reqUserId)
    try {
        const user = await userModel.find({ userId: reqUserId });

        if (!user) {
            return res.status(200).send('User with ID Not Found')
        }

        return res.status(200).send(objectConverter.userResponse(user))

    } catch (err) {
        res.status(500).send({
            message: 'Internal Server Error here'
        })
    }

}


async function update(req, res) {

    const reqUserId = req.params.userId;
    console.log(reqUserId)
    try {
        const user = await userModel.findOne({ userId: reqUserId });

        if (!user) {
            return res.status(200).send('User with ID Not Found')
        }

        user.name = req.body.name ? req.body.name : user.name;

        const newUser = await user.save();
        console.log(newUser)

        const userObj = {
            name: newUser.name,
            userId: newUser.userId,
            email: newUser.email,
            userType: newUser.userType,
            userStatus: newUser.userStatus
        }


        return res.status(200).send(userObj)

    } catch (err) {
        res.status(500).send({
            message: 'Internal Server Error here'
        })
    }

}

module.exports = {
    findAll: findAll,
    findById: findById,
    update: update,
}


