import contr from '../controllers/userController';
import auth from '../middlewares/authenticate';
import express from 'express';

const router = express.Router();

router.post('/signup', contr.addUser);
router.post('/signin', auth, contr.signinUser);
router.delete('/', auth, contr.removeAllClients);
router.get('/clients', auth, contr.getAllClients);
router.put('/:user_email', auth, contr.updateUser);
router.delete('/:user_email', auth, contr.removeUniqueClient);
router.get('/clients/:user_email', auth, contr.getUniqueClient);

export default router;
