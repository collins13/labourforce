const express = require('express');

const debug = require('debug')('app');
const exphbs = require('express-handlebars');
const chalk = require('chalk');
const path = require('path');

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

app.get('/', function(req, res) {
    res.render('home');
});




app.listen(port, () => {
    debug(`app listening to port ${chalk.green(port)}`);
})