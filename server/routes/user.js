import userController from '../controllers/userController';
import express from 'express';

const router = express.Router();

router.get('/clients', userController.getAllClients);
router.get('/clients/:user_email', userController.getUniqueClient);
router.post('/signup', userController.addUser);
router.post('/signin', userController.signinUser);
router.put('/:user_email', userController.updateUser);
router.delete('/:user_email', userController.removeUniqueClient);
router.delete('/', userController.removeAllClients);

export default router;
