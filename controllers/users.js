const passport = require('passport');
const User = require('../models/user');

module.exports.logout = (req, res) => {
    req.logout();
    delete req.session.returnTo;
    req.flash('success', 'You have been logged out! Thanks for visiting!');
    res.redirect('/');
};

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
};

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Express-Bootstrap!');
            const redirectUrl = req.session.returnTo || '/';
            delete req.session.returnTo;
            res.redirect(redirectUrl);
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};
