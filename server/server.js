import express from 'express';
import routes from './routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res, next) => {
  console.log('here');
  next();
});

app.use('/api/v1', routes);

app.use((err, req, res, next) => {
  console.error(err.message);
  next();
});

const port = process.env.PORT || 3000 ;
app.listen(port, () =>
  console.log(`WAYFARER server starting on port ${port}`),
);

export default  app;
