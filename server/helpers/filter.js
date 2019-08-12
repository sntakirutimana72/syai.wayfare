import trips from '../models/trips';
import bookings from '../models/bookings';

export default class {
  /**
   * @param {Boolean} is_admin user privilege indicator
   * @param {Number} user_id a user id number
   * @param {Number} book_ref a booking resource reference number
  */
  static filterBookings(is_admin, user_id, book_ref=null) {
    if (!is_admin) {
      if (book_ref) {
        return bookings.find(book => {
          return book ? ((book_ref === book.id) && (
            book.status !== 'cancelled') && (
              book.user_id === user_id)) : null;
        });
      }
      const founds = bookings.filter(book => {
        return book ? ((book.status !== 'cancelled') && (
          book.user_id === user_id)) : null;
      });
      return founds.length ? founds : null;
    } else {
      if (book_ref) {
        return bookings.find(book => {
          return book ? (book_ref === book.id) : null;
        });
      }
      return bookings.length ? bookings : null;
    }
  }

  /**
   * @param {Boolean} is_admin user privilege indicator
   * @param {Number} trip_ref a trip resource reference number
  */
  static filterTrips(is_admin, trip_ref) {
    if (!is_admin) {
      if (trip_ref) {
        return trips.find(trip => {
          return trip ? ((trip_ref === trip.id) && (
            trip.status !== 'cancelled')) : null;
        });
      }
      const founds = trips.filter(trip => {
        return trip ? (trip.status !== 'cancelled') : null;
      });
      return founds.length ? founds : null;
    } else {
      if (trip_ref) {
        return trips.find(trip => {
          return trip ? (trip_ref === trip.id) : null;
        });
      }
      return trips.length ? trips : null;
    }
  }

  /**
   * @param {Number} user_id  a user id number
  */
  static cancelFilteredBookings(user_id) {
    let status;
    bookings.forEach(book => {
      if ((book.status !== 'cancelled') && (book.user_id === user_id)) {
        book.status = 'cancelled';
        status = true;
      }
    });
    return status;
  }

  /**
   * @param {Number} trip a trip resource object
   * @param {Number} sc new seating capacity 
  */
  static updateTripSeatings(trip, sc) {
    trip.seats = (() => {
      let seats = [];
      for (let i=1; i<=sc; i++) seats.push(i);
      return seats;
    })();

    bookings.forEach(bk => {
      if ((bk.status !== 'cancelled') && (bk.trip_id === trip_id)) {
        if (bk.seat_number > sc) {
          bk.seat_number += (sc - trip.seating_capacity);
        }
        trip.seats.splice((bk.seat_number - 1), 1);
      }
    });
  }
}
