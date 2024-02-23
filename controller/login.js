const User = require('../models/user');
const flash = require('connect-flash');

module.exports.register = (req, res) => {
    res.render('Auth/register');
}

module.exports.newUser = async (req, res) => {
    try {
        const { firstName, lastName, username, password } = req.body;
        const user = new User({ firstName, lastName, username });
        const registerUser = await User.register(user, password);
        req.login(registerUser, function (err) {
            if (err) {
                return next(err);
            }
            req.flash('success','Welcome to Notes');
            res.redirect('/dashboard');
        })
    }
    catch (e) {
        req.flash('error',e.message);
        res.redirect('/auth/register');
    }
}

module.exports.login = (req, res) => {
    res.render('Auth/login');
}

module.exports.loginUser = (req, res) => {
    req.flash('success','Welcome Back !!');
    res.redirect('/dashboard');
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success','GoodBye !!');
        res.redirect('/');
    });
}