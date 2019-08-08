import tripController from '../controllers/tripController';
import express from 'express';

const router = express.Router();

router.get('/', tripController.getAll);
router.get('/:trip_id', tripController.getUnique);
router.post('/', tripController.addTrip);
router.put('/', tripController.updateTrip);
router.delete('/trip_id', tripController.deleteUnique);
router.delete('/', tripController.deleteAll);

export default router;
