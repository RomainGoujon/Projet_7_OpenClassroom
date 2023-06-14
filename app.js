const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const booksRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

// lien pour connecter avec MongoDB
mongoose.connect('mongodb+srv://romainG:' + process.env.MDP_DB + '@cluster0.b1wdcec.mongodb.net/?retryWrites=true&w=majority',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));    

const limiter = rateLimit({
    windowMs: 10* 60 * 1000,
    max: 100,
    message: 'Trop de requêtes effectuées, veuillez patienter.'
});

app.use(limiter);
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION');
    next();
});
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;