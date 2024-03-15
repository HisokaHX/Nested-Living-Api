/*const User = require("../models/User.model");
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');



module.exports.create = (req, res, next) => {
    console.log(req.body)

    User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] })
        .then(user => {
            if (user) {
                next(createError(StatusCodes.BAD_REQUEST, 'Username or email already in use'));
            } else {
                return User.create(req.body)
                    .then(userCreated => {
                        res.status(StatusCodes.CREATED).json(userCreated)
                    })
            }
        })
        .catch(next)
}

const getUser = (id, req, res, next) => {
    User.findById(id)
        .populate('houses')
        .then((user) => {
            if (!user) {
                next(createError(402, "User not found"));
            } else {
                res.json(user);
            }
        })
        .catch(next);
};


module.exports.getCurrentUser = (req, res, next) => {
    getUser(req.currentUserId, req, res, next);
}*/

const User = require("../models/User.model");
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const { transporter, createEmailTemplate } = require("../config/nodemailer.config");
// Función para crear un nuevo usuario
module.exports.create = (req, res, next) => {
    const userToCreate = {
        ...req.body,
        avatar: req.file && req.file.path
    };
    // Verifica si el username o el email ya están en uso
    User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] })
        .then(user => {
            if (user) {
                next(createError(StatusCodes.BAD_REQUEST, 'Username or email already in use'));
            } else {
                // Crea el usuario
                return User.create(userToCreate)
                    .then(userCreated => {
                        // Envía el correo de bienvenida
                        transporter.sendMail(
                            {
                                from: process.env.NODEMAILER_EMAIL,
                                to: userCreated.email,
                                subject: "Bienvenido a tu aplicación",
                                html: createEmailTemplate(userCreated),
                            },
                            function (error, info) {
                                if (error) {
                                    console.error('Error al enviar el correo:', error);
                                } else {
                                    console.log('Correo electrónico enviado:', info.response);
                                }
                                // Responde al cliente
                                res.status(StatusCodes.CREATED).json(userCreated);
                            }
                        );
                    })
                    .catch(next);
            }
        })
        .catch(next);
};
// Función para obtener el usuario actual
module.exports.getCurrentUser = (req, res, next) => {
    // El usuario autenticado está en req.user
    console.log(req.currentUserId)
    User.findById(req.currentUserId)
        .populate('houses')
        .then((user) => {
            if (!user) {
                next(createError(402, "User not found"));
            } else {
                res.json(user);
            }
        })
        .catch(next);

};

module.exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(next);
}

module.exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;
    User.findByIdAndDelete(userId)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        })
        .catch(next);
}








