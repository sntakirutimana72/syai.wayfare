//user manipulation routes like GET, POST, and DELETE verbs
import userController from '../controllers/userController';

/*
const express = require('express');
const uuidv4 = require('uuid/v4');

const router = express.Router();

router.post('/signin', (req, res, next) => {
  const { email, password, is_admin } = req.body.signin;

  if (user = req.context.models.users[email]) {
    if (user.is_admin !== is_admin) {
      return res.status(500).json({ reason: 'Athentication failed' });
    }
    if (user.password === password) {
      req.session.me = { user };
      res.json({
        status: 'success',
        data: {
          token: uuidv4(),
          first_name: user.firstname,
          last_name: user.lastname,
          email: user.email
        }, redirect: '/session'
      });
    } else res.status(500).json({ reason: 'Athentication failed' });
  } else res.status(500).json({ reason: 'Athentication failed' });
});

router.post('/signup', (req, res) => {
  const { signup: vals } = req.body;
  if (req.context.models.users[vals.email]) {
    res.status(500).json({ emails: ['email@wayfarer.it', 'email1@wayfarer.it'] });
  } else {
    if ((vals.is_admin == 'true') && (vals.admin_auth !== req.context.models.admin_auth))
      res.status(500).send('Unable To Authenticate you as an Admin');
    else {
      vals.id = uuidv4();
      vals.createdOn = Date();

      if (vals.is_admin) {
        const { admin_auth, ...user } = vals;
        req.context.models.users[vals.email] = user;
      } else req.context.models.users[vals.email] = vals;
      req.session.me = {};
      return res.render('success');
    }
  }
});

router.get('/signup', (req, res) => {
  if (req.session && req.session.me && req.session.me.user) {
    res.redirect('/session');
  } else res.render('signup');
});

router.get('/signin', (req, res) => {
  if (req.session && req.session.me && req.session.me.user) {
    res.redirect('/session');
  } else res.render('signin');
});

router.post('/forgot', (req, res, next) => {
  if (req.session && req.session.me && req.session.me.user)
    res.redirect('/session');
  else {
    const { retrieve } = req.body;
    const user = req.context.models.users[retrieve.email];
    if (user) {
      Object.keys(retrieve).forEach((rkey) => {
        if (rkey != 'npassword') {
          if (retrieve[rkey] !== user[rkey])
            return res.status(500).send(`Sorry, Couldn't find such account`);
        }
      });
      if (retrieve.is_admin == 'true' && retrieve.g_auth != req.context.models.admin_auth)
        return res.status(500).send(`Sorry, Couldn't find such account`);

      user.password = retrieve.npassword;
      res.status(200).send('Account found & password changed');
    } else return res.status(500).send(`Sorry, Couldn't find such account`);
  }
});

router.get('/forgot', (req, res) => {
  if (req.session && req.session.me && req.session.me.user)
    res.redirect('/session');
  else res.render('forgot');
});
*/

const express = require('express');
const router = express.Router();

router.get('/clients', userController.getAllClients);
router.get('/clients/:user_email', userController.getUniqueClient);
router.post('/signup', userController.addUser);
router.post('/signin', userController.signinUser);
router.put('/:user_email', userController.updateUser);
router.delete('/:user_email', userController.removeUniqueClient);
router.delete('/', userController.removeAllClients);

export default router;
