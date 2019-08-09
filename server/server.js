import express from 'express';
import routes from './routes';

const port = process.env.PORT || 3000 ;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use((err, res, req, next) => {
  console.log(err.message);
})

app.use('/api/v1', routes);

app.listen(port, () =>
  console.log(`WAYFARER server starting on port ${port}`),
);

export default  app;
