// session routes

import express from 'express';

const router = express.Router();

const checkEligibility = (req) => {
  if (req.session.me && (user = req.session.me.user)) {
    return user.is_admin == 'true' ? true : false;
  }
};

const getMe = (req) => {
  const { email, gender, first: firstname, id } = req.session.me.user;
  return { email, gender, firstname, id };
};

const otherUsers = (req) => {
  let others = { ...req.context.models.users };
  delete others[req.session.me.user.email];
  return others;
};

const getUserBookings = (req) => {
  let bookis = { total: 0, bus: 0, boat: 0, train: 0, flight: 0, global: 0 };
  const [{ id }, { bookings }] = [req.session.me.user, req.context.models];

  Object.keys(bookings).forEach((b_id) => {
    if (id == bookings[b_id].user_id) {
      if (bookings[b_id].status == 'Cancelled') { }
      else {
        bookis[bookings[b_id].mode.toLowerCase()]++;
        bookis.total++;
      }
      bookis.global++;
    }
  });
  return bookis;
};

router.get('/', (req, res, next) => {
  //admin session data structure
  const session_v = checkEligibility(req);
  if (session_v) {
    const data = {
      me: getMe(req),
      users: otherUsers(req),
      trips: req.context.models.trips,
      bookings: req.context.models.bookings
    };
    res.render('session', { status: 'success', data });
  }

  else if (session_v == false) {
    //client session data structure
    const data = {
      me: getMe(req),
      bookings: getUserBookings(req)
    };
    res.render('session1', { status: 'success', data });
  }
  else return res.redirect('/auth/signin');

  next();
});

router.get('/profile', (req, res, next) => {
  if ([false, true].includes(checkEligibility(req))) {
    let { is_admin, ...others } = req.session.me.user;
    is_admin = null;
    res.render('profile', {
      data: {
        me: getMe(req),
        info: others
      }
    });
  }
  else return res.redirect('/auth/signin');

  next();
});

router.put('/profile', (req, res, next) => {
  if ([false, true].includes(checkEligibility(req))) {
    const { info } = req.body;
    const { email } = req.session.me.user;

    Object.keys(info).forEach((key) => {
      req.context.models.users[email][key] = info[key];
    });
    req.session.me.user = req.context.models.users[email];
    res.status(200).json({ redirect: '/session/profile' });
  } else res.redirect('/');

});

router.get('/logout', (req, res, next) => {
  if ([false, true].includes(checkEligibility(req))) {
    req.session.destroy();
  }
  res.redirect('/auth/signin');
});

router.get('/clients', (req, res, next) => {
  if (checkEligibility(req)) {
    let clients = {};
    const { users: uClies } = req.context.models;
    Object.keys(uClies).forEach((u_key) => {
      if (uClies[u_key].is_admin == 'false') clients[u_key] = uClies[u_key];
    });
    res.render('clients', {
      status: 'success',
      data: {
        me: getMe(req),
        clients
      }
    });
  } else return next('error');
});

module.exports = router;
