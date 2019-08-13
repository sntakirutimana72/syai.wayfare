// import trips from '../models/trips';
import fDate from '../helpers/fDate';
import filter from '../helpers/filter';
import isParam from '../helpers/isParam';
import unique from '../helpers/unIdentity';
import response from '../helpers/response';
import bookings from '../models/bookings';
import rslvSeat from '../helpers/resolveSeat';
import { bookSchema } from '../helpers/validator';

class bookingController {
  // get All bookings
  static getAll({id: user_id, is_admin}, req, res, next) {
    const allBookings = filter.filterBookings(is_admin, user_id);
    if (!allBookings) response.response(res, 404, 'Resources not found', true);
    return response.response(res, 200, allBookings);
  }
  
  // Get a booking by id
  static getUnique({id: user_id, is_admin}, req, res, next) {
    const book_id = isParam.intParam(req.params);
    if (!book_id) return response.response(res, 400, 'Bad parameter', true);

    const book = filter.filterBookings(is_admin, user_id, book_id);
    if (!book) return response.response(res, 404, 'Resource not found', true);
    return response.response(res, 200, [book]);
  }

  // Book a seat on a trip
  static book({id: user_id, is_admin}, req, res, next) {
    if (is_admin) return response.response(res, 403, 'Action prohibited', true);
    let newBook = bookSchema.book(req.body);
    if (!newBook) return response.response(
      res, 401, 'Operation aborted-Invalid inputs', true);

    const foundTrip = filter.filterTrips(is_admin, newBook.trip_id);
    if (!foundTrip) return response.response(
      res, 404, 'Operation aborted-Needed resource not found', true);

    const seatNumber = rslvSeat.resolve(foundTrip, newBook.seat_number);
    if (typeof(seatNumber) === 'object') return response.response(
      res, 400, `seat taken, available-[${seatNumber}]`, true);
    else if (!seatNumber) return response.response(
      res, 401, 'Sorry, all seats taken', true);
    
    if (!newBook.seat_number) newBook.seat_number = seatNumber;

    let {id: tId, seating_capacity, created_on: creatOn, seats, ...others} = foundTrip;
    newBook = Object.assign(newBook, others);
    others = tId = seating_capacity = creatOn = null;

    let id = unique.uniqueID(bookings), 
    booked_on = fDate.curDate();
    newBook.id = id;
    newBook.user_id = user_id;
    newBook.booked_on = booked_on;
    id = user_id = booked_on = null;
    
    bookings.push(newBook);
    return response.response(res, 201, newBook);
  }

  // Update single booking status and info
  static updateBooking({is_admin, id: user_id}, req, res, nextt) {
    if (is_admin) return response.response(res, 403, 'Action prohibited', true);
    const book_id = isParam.intParam(req.params);
    if (!book_id) return response.response(
      res, 400, 'Operation aborted-Bad parameter', true);

    const book_update = bookSchema.update(req.body);
    if (!book_update) return response.response(
      res, 401, 'Operation aborted-Invalid inputs', true);

    const book = filter.filterBookings(is_admin, user_id, book_id);
    if (!book) return response.response(
      res, 404, 'Operation aborted-Resource not found', true);
    const relTrip = filter.filterTrips(is_admin, book.trip_id);

    const seatNumber = rslvSeat.resolve(relTrip, book_update.seat_number);
    if (typeof(seatNumber) === 'object') return response.response(
      res, 400, `seat occupied, available-[${seatNumber}]`, true);
    else if (!seatNumber) return response.response(
      res, 401, 'Sorry, all seats occupied', true);

    relTrip.seats.push(book.seat_number);
    book.seat_number = seatNumber;
    return response.response(res, 200, book);
  }

  // Cancel single booking
  static deleteUnique({is_admin, id: user_id}, req, res, next) {
    if (is_admin) return response.response(res, 403, 'Action prohibited', true);
    const book_id = isParam.intParam(req.params);
    if (!book_id) return response.response(
      res, 400, 'Operation aborted-Bad parameter', true);

    const book = filter.filterBookings(is_admin, user_id, book_id);
    if (!book) return response.response(
      res, 404, 'Operation aborted-Resource not found', true);
    const relTrip = filter.filterTrips(is_admin, book.trip_id);

    book.status = 'cancelled';
    relTrip.seats.push(book.seat_number);
    return response.response(res, 200, book);
  }

  // cancel all booking
  static deleteAll({is_admin, id}, req, res, next) {
    if (is_admin) return response.response(res, 403, 'Action prohibited', true);
    if (filter.cancelFilteredBookings(id)) return response.response(
      res, 404, 'Resources not found', true);

    return response.response(res, 200, []);
  }
}

export default bookingController;
