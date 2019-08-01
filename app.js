const express = require('express');

const debug = require('debug')('app');
const exphbs = require('express-handlebars');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');


// routes
const indexRoute = require('./routes/indexRoute');
const adminPanel = require('./routes/adminRoute');
// end routes

const app = express();

const port = process.env.PORT || 3000;


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.enable('view cache');
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/plugins', express.static(path.join(__dirname, '/node_modules/plugins')));
app.use('/images', express.static(path.join(__dirname, '/node_modules/images')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/js')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/css')));

// use routes
app.use('/', indexRoute);
app.use('/admin', adminPanel);

// end use routes







app.listen(port, () => {
    debug(`app listening to port ${chalk.green(port)}`);
})