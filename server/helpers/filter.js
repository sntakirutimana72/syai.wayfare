import trips from '../models/trips';
import bookings from '../models/bookings';

export class filter {
  static filterBookings(is_admin, user_id, index) {
    if (!is_admin) {
      if (index) {
        return bookings.find((book, i) => {
          return (
            index == i && book.status != 'cancelled' && book.user_id == user_id
          );
        });
      }
      return bookings.filter((book) => {
        return (
          book.status != 'cancelled' && book.user_id == user_id
        );
      });
    }
    return bookings;
  }

  static filterTrips(is_admin, index) {
    if (!is_admin) {
      if (index) {
        return trips.find((trip, i) => {
          return (index == i && trip.status != 'cancelled')
        });
      }
      return trips.filter((trip) => {
        return trip.status != 'cancelled';
        });
    }
    return trips;
  }
}