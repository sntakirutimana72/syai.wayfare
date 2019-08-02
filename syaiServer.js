const fs = require('fs');
const routes = require('./routes');
const models = require('./models');
const express =  require('express');
const uuidv4 = require('uuid/v4');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
        secret: uuidv4(),
        resave: false,
        saveUninitialized: true,
        cookie: {},
}));

app.use((req, res, next) => {
        req.context = {models};
        next()
});

app.use((err, req, res, next) => {
        if (typeof(err) == 'string') res.render(err);
        next();
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/trips', routes.trip);
app.use('/auth', routes.user);
app.use('/session', routes.session);
app.use('/bookings', routes.booking);

app.get('/', (req, res) => {
        if (req.session.me) res.redirect(`/session`);
        else res.render('index');
});

app.get(/\/css|\/js|\/icons/, (req, res) => {
        res.write(render(req.url));
        res.end();
});

const render = (filename) => fs.readFileSync(__dirname + filename);

app.listen(process.env.PORT || 3000, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);

module.exports = app;