import fs from 'fs';
import routes from './routes';
import models from './models';
import express from 'express';

const port = process.env.PORT || 3000 ;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.listen(port, () =>
  console.log(`WAY-FARER server started on port ${port}`),
);

export default  app;
