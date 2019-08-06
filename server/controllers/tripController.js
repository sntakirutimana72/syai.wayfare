const render = (filename) => fs.readFileSync(__dirname + filename);

class tripController {
  // Get all trips
  static getAll(req, res) {}
  
  // Get a single trip
  static getUnique(req, res) {}

  // create a trip
  static addTrip(req, res) {}

  // update trip info
  static updateTrip(req, res) {}

  // delete single trip
  static deleteUnique(req, res) {}

  //delete all
  static deleteAll(req, res) {}
}

export default tripController;
