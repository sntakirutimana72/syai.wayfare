import trips from '../models/trips';
import bookings from '../models/bookings';

export default class {
  static filterBookings(is_admin, user_id, book_ref=null) {
    if (!is_admin) {
      if (book_ref) {
        return bookings.find(book => {
          return book ? ((book_ref === book.id) && (
            book.status !== 'cancelled') && (
              book.user_id === user_id)) : null;
        });
      }
      return bookings.filter(book => {
        return book ? ((book.status !== 'cancelled') && (
          book.user_id === user_id)) : null;
      });
    } else {
      if (book_ref) {
        return bookings.find(book => {
          return book ? (book_ref === book.id) : null;
        });
      }
      return bookings.length ? bookings : null;
    }
  }

  static filterTrips(is_admin, trip_ref) {
    if (!is_admin) {
      if (trip_ref) {
        return trips.find(trip => {
          return trip ? ((trip_ref === trip.id) && (
            trip.status !== 'cancelled')) : null;
        });
      }
      return trips.filter(trip => {
        return trip ? (trip.status !== 'cancelled') : null;
      });
    } else {
      if (trip_ref) {
        return trips.find(trip => {
          console.log(trip_ref === trip.id, trip_ref, trip);
          return trip ? (trip_ref === trip.id) : null;
        });
      }
      return trips.length ? trips : null;
    }
  }
}
