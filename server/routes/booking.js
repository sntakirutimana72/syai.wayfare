import bookingCtrl from '../controllers/bookingController';
import authentic from '../middlewares/authenticate';
// import isparam from '../middlewares/isParam';

import express from 'express';

const router = express.Router();

router.post('/',  authentic, bookingCtrl.book);
router.get('/',  authentic, bookingCtrl.getAll);
router.get('/:id',  authentic, bookingCtrl.getUnique);
// router.delete('/',  authentic, bookingCtrl.deleteAll);
router.patch('/:id',  authentic, bookingCtrl.updateBooking);
router.delete('/:id',  authentic, bookingCtrl.deleteUnique);

export default router;
