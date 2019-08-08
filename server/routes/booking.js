import bookingController from '../controllers/bookingController';
import express from 'express';

const router = express.Router();

router.get('/', bookingController.getAll);
router.get('/:booking_id', bookingController.getUnique);
router.post('/', bookingController.book);
router.patch('/:status', bookingController.updateBooking);
router.delete('/booking_id', bookingController.deleteUnique);
router.delete('/', bookingController.deleteAll);

export default router;
