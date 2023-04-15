const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretConfig = require('../config/auth.config');


/**
 * SignUp API 
 */

async function signUp(req, res) {
    var userTypeReq = req.body.userType;
    var userStatusReq = 'APPROVED'
    if (userTypeReq == 'ENGINEER') {
        userStatusReq = 'PENDING'
    }

    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        userType: userTypeReq,
        userStatus: userStatusReq,
    }

    try {
        const user = await User.create(userObj);
        res.status(200).send({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userTypeReq,
            userStatus: user.userStatusReq,
        });
    } catch (err) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

/**
 * SignIn API 
 */

async function signIn(req, res) {
    const user = await User.findOne({ userId: req.body.userId });
    console.log(user);

    if (user == null) {
        return res.status(400).send({
            message: 'User Id does not exist'
        })
    }

    if (user.userStatus != 'APPROVED') {
        return res.status(200).send({
            message: 'User Id is not Approved, Cannot Login!!'
        })
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(200).send({
            message: 'Invalid Password'
        })
    }

    /**
    * Create JWT Token send it to User
    */

    var token = jwt.sign({ id: user.userId }, secretConfig.secretKey);
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        userStatus: user.userStatus,
        accessToken: token
    })


}

module.exports = {
    signUp: signUp,
    signIn: signIn
};
