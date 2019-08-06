import tripController from '../controllers/tripController';
import express from 'express';

/*
const express = require('express');
const uuidv4 = require('uuid/v4');

const router = express.Router();

const checkEligibility = (req) => {
  if (req.session.me && (user = req.session.me.user)) {
    return user.is_admin == 'true' ? true : false;
  }
};

const getMe = (req) => {
  const { email, gender, first: firstname } = req.session.me.user;
  return { email, gender, firstname };
};

router.get('/', (req, res) => {
  const session_v = checkEligibility(req);
  if (session_v) {
    res.render('trips', {
      status: 'success',
      data: {
        trips: req.context.models.trips,
        me: getMe(req)
      }
    });
  } else if (session_v == false) {
    res.render('trips1', {
      status: 'success',
      data: {
        me: getMe(req),
        trips: (function () {
          let tris = {}, { trips } = req.context.models;
          Object.keys(trips).forEach((trip_id) => {
            if (trips[trip_id].status != 'Cancelled')
              tris[trip_id] = trips[trip_id];
          });
          return Object.keys(tris).length ? tris : null;
        })()
      }
    });
  } else res.redirect('/');
});

const getBrowserReqByMode = (req, mode, session) => {
  let otherTrip = {};
  const { trips: tripis } = req.context.models;

  if (session) {
    Object.keys(tripis).forEach((t_id) => {
      if (tripis[t_id].mode == mode) otherTrip[t_id] = tripis[t_id];
    });
  } else {
    Object.keys(tripis).forEach((t_id) => {
      if (tripis[t_id].mode == mode && tripis[t_id].status != 'Cancelled')
        otherTrip[t_id] = tripis[t_id];
    });
  }
  return Object.keys(otherTrip).length ? { ...otherTrip } : null;
};

const ajaxReqByMode = (req, mode) => {
  let modedTrips = {};
  const { trips: tripis } = req.context.models;
  Object.keys(tripis).forEach((t_id) => {
    if (tripis[t_id].mode == mode && tripis[t_id].status != 'Cancelled') {
      const { user_id: user, ...theRest } = tripis[t_id];
      modedTrips[t_id] = theRest;
    }
  });
  return Object.keys(modedTrips).length ? { ...modedTrips } : null;
};

const updateAllRelatedBookings = (req) => {
  const [{ trip_id }, { bookings: bookis }] = [req.params, req.context.models];
  Object.keys(bookis).forEach((id) => {
    if (!bookis[id].status && bookis[id].trip_id == trip_id)
      bookis[id].status = 'Cancelled';
  });
};

const browserReqByMode = (mode, req, res, session) => {
  if (session) {
    res.render('trips', {
      status: 'success',
      data: {
        me: getMe(req),
        trips: getBrowserReqByMode(req, mode, true)
      }
    });
  } else {
    res.render('trips1', {
      status: 'success',
      data: {
        me: getMe(req),
        trips: getBrowserReqByMode(req, mode)
      }
    });
  }
};

router.get('/:trip_id', (req, res, next) => {
  const session_v = checkEligibility(req);

  if (session_v || session_v == false) {
    if (/^((Bus|Boat|Train|Flight))$/.test(req.params.trip_id)) {
      //Used when client is about to book a seat on a trip
      browserReqByMode(req.params.trip_id.replace('fe-', ''), req, res, session_v);
    } else if (/^(fe-(Bus|Boat|Train|Flight))$/.test(req.params.trip_id)) {
      //Used when acquiring all available trips with a particular mode, by the browser
      if (session_v == false) {
        return res.json({
          status: 'success',
          data: ajaxReqByMode(req, req.params.trip_id.replace('fe-', ''))
        });
      } else return next('error');
    } else {
      return res.json({
        status: 'success',
        me: getMe(req),
        trips: (() => {
          const found = req.context.models.trips[req.params.trip_id];
          if (session_v) return found;
          else {
            if (found && found.status != 'Cancelled') return found;
          }
        })()
      });
    }
    next();
  } else res.redirect('/');
});

router.post('/', (req, res, next) => {
  if (checkEligibility(req)) {
    const id = uuidv4();
    const { trip_info } = req.body;

    trip_info.status = 'Active';
    trip_info.createdOn = Date();
    trip_info.user_id = req.session.me.user.id;

    trip_info.seat_nums = (() => {
      let seats = [];
      for (let i = 1; i <= trip_info.seat_capacity; i++) seats.push('' + i);
      return seats;
    })();

    req.context.models.trips[id] = trip_info;
    return res.json({
      status: 'success',
      data: {
        id,
        createdOn: trip_info.createdOn
      }
    });
  } else return next('error');
});

router.delete('/:trip_id', (req, res, next) => {
  if (checkEligibility(req)) {
    if (toDelete = req.context.models.trips[req.params.trip_id]) {
      if (toDelete.status == `Cancelled`) return res.status(403).send('Not appliable');
      else {
        toDelete.status = 'Cancelled';
        updateAllRelatedBookings(req);
        return res.json({ status: 'success' });
      }
    } else return res.status(404).json({ error: 'Resource not found' });
  } else return next('error');
});

*/

const router = express.Router();

router.get('/', tripController.getAll);
router.get('/:trip_id', tripController.getUnique);
router.post('/', tripController.addTrip);
router.put('/', tripController.updateTrip);
router.delete('/trip_id', tripController.deleteUnique);
router.delete('/', tripController.deleteAll);

export default router;
