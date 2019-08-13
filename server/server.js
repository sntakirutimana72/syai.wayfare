import express from 'express';
import routes from './routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use((err, res, req, next) => {
  console.log(err.message);
  next();
})

app.use('/api/v1', routes);
app.use('/UI', express.static(
  '/home/nuru/Desktop/Andela Cycle-9/way-farer/UI'));

export default  app;
