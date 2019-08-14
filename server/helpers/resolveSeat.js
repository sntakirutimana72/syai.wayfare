export default class {
  /**
    * @param {Object} trip for which the number param is going to be applied
    * @param {Number} number It's is a seat number to be verified if not taken
  */
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