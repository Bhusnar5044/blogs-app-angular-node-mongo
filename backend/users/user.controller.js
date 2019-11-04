const express = require('express');
const router = express.Router();
const userService = require('./user.service');

router.post('/login', authenticate);
router.post('/register', register);

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json({ message: 'Login Succed!', status: 200 ,user}) : res.json({ message: 'Username or password is incorrect', status: 202 }))
        .catch(err => res.json({ message: err, status: 202 }));
}

function register(req, res, next) {
    userService.register(req.body)
        .then(() => res.json({status: 200, message: 'Successfully registered !'}))
        .catch(err => res.json({ message: err, status: 202 }));
}

module.exports = router;
