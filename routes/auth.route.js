const authController = require('../controllers/auth.controller')


module.exports = function (app) {
    app.post('/crm/api/v1/auth/signup', authController.signUp)
    app.post('/crm/api/v1/auth/signin', authController.signIn)
}


