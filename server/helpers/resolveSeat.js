export default class {
  static resolve(trip, number) {
    if (number) {
      if (!trip.seats.includes(number)) return trip.seats;
      else {
        trip.seats.splice(trip.seats.indexOf(number), 1);
        return true;
      }
    } else if (!trip.seats.length) return false;

    return trip.seats.shift();
  }
}