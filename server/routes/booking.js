import bookingController from '../controllers/bookingController';

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

const getMyBookSched = (req, mode) => {
  let myBookis = {};
  const { bookings: bookis } = req.context.models;
  Object.keys(bookis).forEach((b_id) => {
    if (bookis[b_id].user_id == req.session.me.user.id && bookis[b_id].status !== 'Cancelled') {
      if (!mode) myBookis[b_id] = bookis[b_id];
      else {
        if (bookis[b_id].mode == mode) myBookis[b_id] = bookis[b_id];
      }
    }
  });
  return Object.keys(myBookis).length ? myBookis : null;
};

const getBooByMode = (req, mode) => {
  let bookis = {};
  const { bookings: all } = req.context.models;
  Object.keys(all).forEach((b_id) => {
    if (all[b_id].mode == mode) bookis[b_id] = all[b_id];
  });
  return Object.keys(bookis).length ? bookis : null;
};

router.get('/', (req, res, next) => {
  //retrieve all available bookings
  const session_v = checkEligibility(req);

  if (session_v) {
    return res.render('bookings', {
      status: 'success',
      data: {
        me: getMe(req),
        bookings: req.context.models.bookings
      }
    });
  } else if (session_v == false) {
    return res.render('bookings1', {
      status: 'success',
      data: {
        me: getMe(req),
        bookings: getMyBookSched(req)
      }
    });
  } else return next('error');
});

router.get('/:booking_id', (req, res, next) => {
  //fetch a particular booking
  const session_v = checkEligibility(req);

  if (session_v) {
    return res.render('bookings', {
      status: 'success',
      data: {
        me: getMe(req),
        bookings: (function () {
          if (/^(Bus|Boat|Train|Flight)$/.test(req.params.booking_id)) {
            return getBooByMode(req, req.params.booking_id);
          }
          const booked = req.context.models.bookings[req.params.booking_id];
          if (booked) return { [req.params.booking_id]: booked };
        })()
      }
    });
  } else if (session_v == false) {
    return res.render('bookings1', {
      status: 'success',
      data: {
        me: getMe(req),
        bookings: (function () {
          if (/^(Bus|Boat|Train|Flight)$/.test(req.params.booking_id)) {
            return getMyBookSched(req, req.params.booking_id);
          }
          const booked = req.context.models.bookings[req.params.booking_id];
          if (booked && booked.status != 'Cancelled' && booked.user_id == req.session.me.user.id)
            return { [req.params.booking_id]: booked };
        })()
      }
    });
  } else return res.next('error');
});

const verifySeatNum = (req, num, trip_id) => {
  const { seat_nums } = req.context.models.trips[trip_id];

  if (seat_nums.includes(num)) {
    seat_nums.splice(seat_nums.indexOf(num), 1);
    return true;
  }
};

const returnSeat = (toDel, req) => {
  const targetrip = req.context.models.trips[toDel.trip_id];
  if (targetrip.status == 'Active') targetrip.seat_nums.push(toDel.seat_number);
};

router.post('/', (req, res, next) => {
  //Booking a seat on an available trip
  if (checkEligibility(req) == false) {
    const id = uuidv4();
    const { book_info } = req.body;

    if (!verifySeatNum(req, book_info.seat_number, book_info.trip_id))
      return res.json({ status: 'change', data: {} });
    book_info.createdOn = Date();
    book_info.user_id = req.session.me.user.id;
    req.context.models.bookings[id] = book_info;

    return res.json({
      status: 'success',
      data: {}
    });
  } else return next('error');
});

router.delete('/:booking_id', (req, res, next) => {
  const session_v = checkEligibility(req);

  if (session_v) {
    if (toDelete = req.context.models.bookings[req.params.booking_id]) {
      if (toDelete.status) return res.status(403).send('Not Appliable');
      toDelete.status = 'Cancelled';
      returnSeat(toDelete, req);
      return res.json({
        status: 'success',
        data: {}
      });
    }
  } else if (session_v == false) {
    if (toDelete = req.context.models.bookings[req.params.booking_id]) {
      if (toDelete.user_id == req.session.me.user.id) {
        toDelete.status = 'Cancelled';
        returnSeat(toDelete, req);
        return res.json({
          status: 'success',
          data: {}
        });
      }
      return res.status(403).send('Not Appliable');
    } else return res.status(403).send('Access restricted');
  }
  else return next('error');
});
*/

const express = require('express');
const router = express.Router();

router.get('/', bookingController.getAll);
router.get('/:booking_id', bookingController.getUnique);
router.post('/', bookingController.book);
router.put('/', bookingController.updateBooking);
router.delete('/booking_id', bookingController.deleteUnique);
router.delete('/', bookingController.deleteAll);

export default router;
