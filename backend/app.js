const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const config = require('./config/options.config');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({ secret: config.secret, resave: true, saveUninitialized: true }));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/auth.config').basic(passport);

//auth Router
const auth = express.Router();
require('./routes/auth')(auth);
app.use('/auth', auth);

//User Router
const userApi = express.Router();
require('./routes/users')(userApi, passport);
app.use('/api/users', userApi);

//Complaint Router
const complaintApi = express.Router();
require('./routes/complaints')(complaintApi, passport);
app.use('/api/complaints', complaintApi);

//Auth Router
const authApi = express.Router();
require('./routes/auth')(authApi);
app.use('/api/auth', authApi);

app.get('/', (req, res) => {
    res.send('API is working...');
});

// catch 404 and forward to error handler
app.all('*', (req, res, next) => {
    res.json({ response: false, message:`URL: ${req.url} with method: ${req.method} not found`}).end();
});


module.exports = app;