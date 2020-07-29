const userController = require('../controllers/user');

const user = (router, auth) => {
    router.post('/users', (req, res) => userController.create(req, res));
    router.post('/users/sign-in', (req, res) => userController.signIn(req, res));

    return router;
};

module.exports = user;
