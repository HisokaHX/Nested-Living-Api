/*const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { statusCodes, StatusCodes } = require("http-status-codes");
const User = require("../models/User.model");

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;

    const LOGIN_ERROR_MESSAGE = 'Email or password invalid';

    const errorFn = () => next(createError(StatusCodes.BAD_REQUEST, LOGIN_ERROR_MESSAGE));

    if (!email || !password) {
        return errorFn();
    }

    User.findOne({ email })
    .then(user => {
        if (!user) {
            errorFn();
        } else {
            return user.checkPassword(password)
            .then(match => {
                if (!match) {
                    errorFn();
                } else {
                    const token = jwt.sign(
                        { id: user.id },
                        process.env.JWT_SECRET || 'test',
                        { expiresIn: '1d' }
                        )

                        res.json({ accessToken: token });
                }
            })
        }
    })

    .catch(next)
}*/

const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User.model");
module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(createError(StatusCodes.BAD_REQUEST, 'Email or password invalid'));
        }
        const user = await User.findOne({ email });
        if (!user) {
            return next(createError(StatusCodes.BAD_REQUEST, 'Email or password invalid'));
        }
        const isPasswordValid = await user.checkPassword(password);
        if (!isPasswordValid) {
            return next(createError(StatusCodes.BAD_REQUEST, 'Email or password invalid'));
        }
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'test',
            { expiresIn: '1d' }
        );
        res.json({ accessToken: token });
    } catch (error) {
        next(error);
    }
};
module.exports.activate = (req, res, next) => {
    const { token } = req.params;
    console.log('Activation token received:', token);
    User.findOneAndUpdate(
        { activationToken: token },
        { isActive: true },
        { new: true }
    )
        .then((dbUser) => {
            console.log('User activated:', dbUser);
            res.json({ email: dbUser.email, message: 'Account activated successfully!' });
        })
        .catch((error) => {
            console.error('Activation error:', error);
            res.status(500).json({ error: 'Activation failed. Please try again.' });
        });
};