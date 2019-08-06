const fs = require('fs');
const routes = require('./routes');
const models = require('./models');
const express = require('express');
const uuidv4 = require('uuid/v4');
const port = process.env.PORT;

const app = express();

app.use(express.bodyParser())
app.use(express.session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: true,
  cookie: {},
}));

app.use((req, res, next) => {
  req.context = { models };
  next()
});

app.use('/trips', routes.trip);
app.use('/auth', routes.user);
app.use('/message', routes.message);
app.use('/bookings', routes.booking);

app.get('/', (req, res) => {});

const render = (filename) => fs.readFileSync(__dirname + filename);

app.listen(port || 3000, () =>
  console.log(`WAY-FARER server started on port ${port}`),
);

export default  app;
