import userCtrl from '../controllers/userController';
import express from 'express';

const router = express.Router();

router.post('/signup', userCtrl.addUser);
// router.get('/logout', authentic, userCtrl.logout);
router.post('/signin',  userCtrl.signinUser);
// router.delete('/',  authentic, userCtrl.removeAllClients);
// router.get('/clients',  authentic, userCtrl.getAllClients);
// router.put('/:user_email',  authentic, userCtrl.updateUser);
// router.delete('/:user_email',  authentic, userCtrl.removeUniqueClient);
// router.get('/clients/:user_email',  authentic, userCtrl.getUniqueClient);

export default router;
