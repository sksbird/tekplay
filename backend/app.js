const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const guard = require('./config/auth.config');
const session = require('express-session');
const config = require('./config/options.config');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSanitized.middleware());
app.use(cookieParser());

app.use(session({ secret: config.secret, resave: true, saveUninitialized: true }));

//auth Router
const auth = express.Router();
require('./routes/auth')(auth);
app.use('/auth', auth);

//User Router
const userApi = express.Router();
require('./routes/users')(userApi, guard);
app.use('/api/users', userApi);

//User Router
const complaintApi = express.Router();
require('./routes/complaints')(complaintApi, guard);
app.use('/api/complaints', complaintApi);

app.get('/', (req, res) => {
    res.send('API is working...');
});

// catch 404 and forward to error handler
app.all('*', (req, res, next) => {
    res.json({ response: false, message:`URL: ${req.url} with method: ${req.method} not found`}).end();
});


module.exports = app;