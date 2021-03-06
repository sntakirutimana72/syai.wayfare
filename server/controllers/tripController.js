import trips from '../models/trips';
import fDate from '../helpers/fDate';
import filter from '../helpers/filter';
import isParam from '../helpers/isParam';
import bookings from '../models/bookings';
import unique from '../helpers/unIdentity';
import response from '../helpers/response';
import { tripSchema } from '../helpers/validator';

class tripController {
  // Get all trips
  static getAll({is_admin}, req, res, next) {
    const allTrips = filter.filterTrips(is_admin);
    if (!allTrips) response.response(res, 404, 'Resources not found', true);
    return response.response(res, 200, allTrips);
  }
  
  // Get a single trip
  static getUnique({is_admin}, req, res, next) {
    const trip_id = isParam.intParam(req.params);
    if (!trip_id) return response.response(res, 400, 'Bad parameter', true);

    const trip = filter.filterTrips(is_admin, trip_id);
    if (!trip) return response.response(res, 404, 'Resource not found', true);
    return response.response(res, 200, [trip]);
  }

  // create a trip
  static addTrip({is_admin}, req, res, next) {
    if (!is_admin) return response.response(res, 403, 'Action prohibited', true);
    const newTrip = tripSchema.create(req.body);
    if (!newTrip) return response.response(
      res, 401, 'Operation aborted-Invalid inputs', true);

    const id = unique.uniqueID(trips), created_on = fDate.curDate();
    newTrip.id = id, newTrip.created_on = created_on;
    newTrip.seats = (()=>{
      let seats = [];
      for (let i=1; i<=newTrip.seating_capacity; i++) seats.push(i);
      return seats;
    })();
    trips.push(newTrip);
    return response.response(res, 201, newTrip);
  }

  // update trip info
  static updateTrip({is_admin}, req, res, next) {
    if (!is_admin) return response.response(
      res, 403, 'Operation aborted-Not allowed', true);

    let trip_id = isParam.intParam(req.params);
    if (!trip_id) return response.response(
      res, 400, 'Operation aborted-Bad parameter', true);

    const trip_update = tripSchema.update(req.body);
    if (!trip_update) return response.response(
      res, 401, 'Operation aborted-Invalid inputs', true);

    const trip = filter.filterTrips(is_admin, trip_id);
    if (!trip) return response.response(
      res, 404, 'Operation aborted-Resource not found', true);
    trip_id = null;

    let sc;
    if (sc = trip_update.seating_capacity) {
      if (sc === trip.seating_capacity) return response.response(
        res, 400, 'Resource unchanged, already up-to-date', true);

      if (sc > trip.seating_capacity) {
        (() => {
          for (let i=(trip.seating_capacity+1); i<=sc; i++) 
            trip.seats.push(i);
        })();
        trip.seating_capacity = sc;
      }
      else {
        if ((trip.seating_capacity - trip.seats.length) > sc) {
          return response.response(
            res, 400, "Resource's changes not appliable", true);
        }
        if ((trip.seating_capacity - trip.seats.length) === sc) {
          return response.response(
            res, 400, 'Resource unchanged, already up-to-date', true);
        }
        filter.updateTripSeatings(trip, sc);
      }
    }

    let bln;
    if (bln = trip_update.bus_licence_number) {
      trip.bus_licence_number = bln;
    }
    return response.response(res, 200, trip);
  }

  // delete single trip
  static deleteUnique({is_admin}, req, res, next) {
    if (!is_admin) return response.response(
      res, 403, 'Operation aborted-Not allowed', true);

    const trip_id = isParam.intParam(req.params);
    if (!trip_id) return response.response(
      res, 400, 'Operation aborted-Bad parameter', true);

    const trip = filter.filterTrips(is_admin, trip_id);
    if (!trip) return response.response(
      res, 404, 'Operation aborted-Resource not found', true);

    if (trip.status === 'cancelled') return response.response(
      res, 400, "Operation ignored-resource state already up-to-date", true);

    trip.status = 'cancelled';
    bookings.forEach(book => {
      if ((book.status !== 'cancelled') && (
        book.trip_id === trip.id)) book.status = 'cancelled';
    });
    return response.response(res, 200, trip);
  }

  //delete all
  static deleteAll({is_admin}, req, res, next) {
    if (!is_admin) return response.response(
      res, 403, 'Operation aborted-Not allowed', true);
    
    const cancelled = filter.cancelAllActiveTrips();
    if (!cancelled) return response.response(
      res, 404, "Operation aborted-Resources' not found", true); 
    return response.response(res, 200, trips);
  }
}

export default tripController;
