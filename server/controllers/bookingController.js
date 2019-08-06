const render = (filename) => fs.readFileSync(__dirname + filename);

class bookingController {
  // Get all bookings
  static getAll(req, res) {}
  
  // Get a single booking
  static getUnique(req, res) {}

  // Book a seat on a trip
  static book(req, res) {}

  // Update single booking status and info
  static updateBooking(req, res) {}

  // Cancel single booking
  static deleteUnique(req, res) {}

  // cancel all booking
  static deleteAll(req, res) {}
}

export default bookingController;
