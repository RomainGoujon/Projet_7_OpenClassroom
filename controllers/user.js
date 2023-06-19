const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const emailValidator = require('email-validator');
const validatePassword = require('../passwordSchema');
const mongoSanitize = require('mongo-sanitize');
require('dotenv').config();


exports.signup = (req, res) => {
    const email = mongoSanitize(req.body.email);
    const password = mongoSanitize(req.body.password);

    if(!emailValidator.validate(email)) {
        return res.status(401).json({ message: 'Email et/ou Mot de passe pas valide' });
    } 
    if(!validatePassword(password)) {
        return res.status(401).json({ message: 'Email et/ou Mot de passe pas valide' });
    }

    bcrypt.hash(password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));     
        })
        .catch(error => res.status(500).json({ error }));
};


exports.login = (req, res) => {
    const email = mongoSanitize(req.body.email);

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Paire login/mot de passe incorrecte' });
            } 
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                    return res.status(401).json({
                        message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.CLE_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error })); 
        })
        .catch(error => res.status(500).json({ error }));
};