import tripCtrl from '../controllers/tripController';
import authentic from '../middlewares/authenticate';
import express from 'express';

const router = express.Router();

router.get('/', authentic, tripCtrl.getAll);
router.post('/', authentic, tripCtrl.addTrip);
router.patch('/', authentic, tripCtrl.updateTrip);
router.get('/:id', authentic, tripCtrl.getUnique);
router.delete('/:id', authentic, tripCtrl.deleteUnique);
// router.delete('/', authentic, tripCtrl.deleteAll);

export default router;
