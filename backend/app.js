require('dotenv').config({ path: __dirname + '/config/dev.env' });
const csrf = require('csurf');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const authRoutes = require('./routes/auth');
const manipuladosRoutes = require('./routes/manipulados');
const orcamentosRoutes = require('./routes/orcamentos');
const utilsRoutes = require('./routes/utils');
const MONGODB_URI = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

const public_folder = path.join(__dirname, 'public');

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');

app.use(express.static(public_folder));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: store
    })
);

app.use(cookieParser());

// app.use(csrfProtection);

app.use('/', utilsRoutes);

app.use('/auth', authRoutes);

app.use('/manipulados', manipuladosRoutes);

app.use('/orcamentos', orcamentosRoutes);

module.exports = app;
