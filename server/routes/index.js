import user from './user';
import trip from './trip';
import booking from './booking';
import express from 'express';

const router = express.Router();

router.use('/trip', trip);
router.use('/auth', user);
router.use('/booking', booking); 

export default router;
