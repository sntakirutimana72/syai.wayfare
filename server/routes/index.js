import booking from './booking';
import user from './user';
import  trip from './trip';
import express from 'express';

const router = express.Router();

router.use('/trip', trip);
router.use('/auth', user);
router.use('/booking', booking); 

export default router;
