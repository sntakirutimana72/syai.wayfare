import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';

dotenv.config();

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((error, res, req, next) => {
  next();
})

app.use('/api/v1', routes);
app.use('/UI', express.static(path.join(__dirname, '..', 'UI')));
app.use('/', (req, res) => res.render(path.join(__dirname, '..', 'UI', 'views', 'index')));

export default  app;
